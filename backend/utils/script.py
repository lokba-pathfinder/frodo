"""
    유튜브 비디오 스크립트를 처리합니다.
    최종적으로, Full Scripts, Summary Scripts를 반환하는 모듈 입니다.

"""
from copy import deepcopy
import os
from pydub import AudioSegment
from pytube import YouTube
from youtube_transcript_api import YouTubeTranscriptApi
from utils.gpt import refine_query
from utils.gpt import summary_query


def get_raw_script(video_id: str) -> list:
    """get script from video_id using api"""
    return YouTubeTranscriptApi.get_transcript(video_id)


def script_preprocess(script: list) -> list:
    """
        gather script and preprocess it.

    1. divide the script by each sentence.
    2. put it in the list.
    3. assign the timestamp to each sentence.

    Args:
        script (list): Script you want to preprocess

    Returns:
        list: a list of sentence dictionaries containing
        the 'text', 'start' and 'duration' keys after preprocessing.
    """
    # 스크립트를 문장별로 변환 후, line별로 나타낼 수 있게 도와준다.
    sentences = []
    temp_text = ""
    temp_start = 0
    can_endpoint = True  # if current can be the end point or not

    for scr in script:
        if temp_text == "":
            temp_start = scr["start"]

        cur_text = scr["text"].replace("\n", " ")
        temp_text += " " + cur_text

        if '"' in scr["text"]:
            if scr["text"].count('"') % 2 == 0:
                continue
            can_endpoint ^= True
            if not can_endpoint:
                continue

        if "." in cur_text:
            if not can_endpoint:
                continue

            temp_sentence = {
                "text": temp_text,
                "start": temp_start,
            }
            sentences.append(temp_sentence)
            temp_text = ""

    print("Done: Script preprocess")
    return sentences


def get_script_refined_and_preprocessed_by_whisper(video_id: str) -> list:
    """
    download video by video_id
    refine video script with the whisper

    Args:
        video_id (str): The video for which you want to get scripts.

    Returns:
        a list of dictionaries containing 'text',and 'start' keys after refined.
    """
    video_url = "https://www.youtube.com/watch?v=" + video_id
    video_api = YouTube(video_url)
    video_title = video_api.title
    print(f"video title {video_title} is being refined")
    scripts = []
    video_api.streams.filter(only_audio=True).first().download(
        filename=f"{video_id}_audio.mp3"
    )
    audio = AudioSegment.from_file(f"{video_id}_audio.mp3")
    # chunk size is 20 minutes
    chunk_size = 1200 * 1000
    output_prefix = f"{video_id}_sub_audio"

    for i in range(0, len(audio), chunk_size):
        start_time = i
        end_time = min(i + chunk_size, len(audio))
        sub_audio = audio[start_time:end_time]
        sub_audio.export(f"{output_prefix}_{i // chunk_size}.mp3")
        audio_file = open(f"{output_prefix}_{i // chunk_size}.mp3", "rb")
        transcript = refine_query(audio_file, video_title)
        for scr in transcript["segments"]:
            scripts.append({"start": scr["start"] + i / (1000), "text": scr["text"]})
        os.remove(f"{output_prefix}_{i // chunk_size}.mp3")

    os.remove(f"{video_id}_audio.mp3")
    return scripts


def get_script(video_id: str, need_refine: bool) -> list:
    """
    get preprocessed script from vide_id
    'script is provided as list of each sentence.'
    """
    if need_refine:
        return get_script_refined_and_preprocessed_by_whisper(video_id)
    return script_preprocess(get_raw_script(video_id))


def get_raw_summary(script: list) -> list:
    """from refined script, produce summary
        Format is list of json.
        Each json is matched to "summary_script" on the API 명세서
        Summary_script has 'id', 'video_id', 'content', 'full_script_ids'

    Args:
        script (list): list of json(script)
        video_id (str): used for summary script

    Returns:
        list: list of jsons(summaryScript)
            example format
            {'id': ..., 'video_id': ..., 'content': ...,
            'full_script_ids': [full_script_id1, full_script_id2, ..]
            }
    """

    query_script = ""
    for i, scr in enumerate(script):
        query_script += "line " + str(i + 1) + " " + scr["text"] + "\n"

    raw_summary = summary_query(query_script)

    print("Done: Raw summary creation")
    return raw_summary


def summary_preprocess(raw_summary: str, video_id: str) -> list:
    """from raw summary (str), produce list of summary json
        1. each json will have more than one script ids
        2. parse string and preprocess

    Args:
        raw_summary (str): summary string
        video_id (str): video_id for json format

    Returns:
        list: list of summary_script (json) format
            summary_script has 'id', 'video_id', 'content',
                'full_script_ids'
    """
    ret_list = []

    order = 0
    temp_json = {}
    temp_content = ""

    for line in raw_summary.split("\n"):
        if "(lines" in line:  # It's title
            if temp_content == "":  # 이전에 다른 title이 없었다면
                temp_content = ""
                order += 1

            else:
                temp_json["content"] = temp_content
                temp_json["id"] = order
                ret_list.append(deepcopy(temp_json))
                order += 1
                temp_content = ""
                temp_json = {}

            t_index = line.find("(lines")
            from_, to_ = map(int, line[t_index + 6 : -1].split("-"))
            temp_json["video_id"] = video_id
            temp_json["full_script_ids"] = list(range(from_, to_ + 1))
            temp_content += line + "\n"
            continue

        if "*" in line:
            temp_content += line + "\n"
    else:
        temp_json["content"] = temp_content
        temp_json["id"] = order
        ret_list.append(deepcopy(temp_json))

    # summary 형식이 이상하면 ret_list = [] 로 변경하고 assert 에러 출력
    for ret in ret_list:
        if "*" in ret["content"].split("\n")[0]:
            ret_list = []
            break
    assert len(ret_list) > 0, "Summary format is wrong."

    # issue #189. 한 스크립트가 여러 요약문에 매칭이 되는지 감지하고 에러 출력
    script_set = set()
    is_double_matched = False
    for ret in ret_list:
        assert "full_script_ids" in ret.keys(), "Script format undefined."
        for scr_id in ret["full_script_ids"]:
            if scr_id in script_set:
                is_double_matched = True
                break
            script_set.add(scr_id)

    assert is_double_matched == False, "Script is doubly matched."

    print("Done: Summary preprocess")

    for ret in ret_list:
        assert len(ret["full_script_ids"]) > 0, "Full script id is not matched."

    return ret_list


def get_summary(video_id: str, need_refine: bool) -> list:
    """get preprocessed script from vide_id
    do summary by chat gpt
    preprocess the summary
    """
    preprocessed_script = get_script(video_id, need_refine)
    raw_summary = get_raw_summary(preprocessed_script)
    return summary_preprocess(raw_summary, video_id)


def get_full_and_summary_scripts(video_id: str, need_refine=False) -> list:
    """
        This function returns both full scripts and summary scripts, formatted to align with the database schema.
        1. find full and summary scripts
        2. change its format for DB insertion

    Args:
        video_id (str)

    Returns:
        list: 'appropriate form of' [script list, summary list]
    """

    # get full and summary scripts
    preprocessed_script = get_script(video_id, need_refine)
    raw_summary = get_raw_summary(preprocessed_script)
    summary_script = summary_preprocess(raw_summary, video_id)

    # change preprocessec script to a format which is useful to DB
    full_script = []
    for i, scr in enumerate(preprocessed_script):
        temp_dict = {"video_id": video_id}
        temp_dict["line_id"] = i + 1
        temp_dict["summary_script_id"] = None
        temp_dict["start"] = scr["start"]
        temp_dict["content-en"] = scr["text"]
        temp_dict["content-ko"] = "."
        full_script.append(deepcopy(temp_dict))

    if len(summary_script) == 0 or "*" not in summary_script[0]["content"]:
        print("video.py")
        return [None, None]

    for sum_scr in summary_script:
        for i in sum_scr["full_script_ids"]:
            full_script[i - 1]["summary_script_id"] = sum_scr["id"]
        sum_scr["content-ko"] = "."
        sum_scr["content-en"] = sum_scr["content"]
        del sum_scr["content"]

    return [full_script, summary_script]
