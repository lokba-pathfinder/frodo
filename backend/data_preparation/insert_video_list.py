"""
    CLI명령어로 video source list (txt 파일)를 입력받으면, Database를 불러와서 리스트의 data를 입력합니다.
    example : (frodo/backend 에서 실행)
        python -m data_preparation.insert_video -s {your_video_list_txt_form}

"""
import argparse
from copy import deepcopy
from youtube_transcript_api import YouTubeTranscriptApi
from app.db.session import SessionLocal
from app.services.video_service import *
from app.services.summary_script_service import *
from app.services.full_script_service import *
from app.models import *
from utils.embedding import add_embedding_vector
from utils.translate import full_scripts_add_ko, summary_scripts_add_ko
from utils.video import get_video_info
from utils.script import get_full_and_summary_scripts


def insert_video(session, video_id) -> None:
    # check if the video is longer than 40 minutes
    video_data = get_video_info(video_id)
    assert video_data["total_time"] <= 2400, f"[Error] video_id ({video_id}) : too long"
    need_refine = False

    # check if english subtitle exists
    try:
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
        transcript = transcript_list.find_transcript(["en", "ko"])
    except KeyboardInterrupt:
        raise KeyboardInterrupt
    except:
        print(f"[Error] video_id ({video_id}) : can't find subtitle.")
        raise

    # check if the subtitle is auto-generated. If it is, refinement(whisper) is needed.
    if "Korean" in transcript.language or transcript.is_generated:
        need_refine = True
        print("refinement is needed. Whisper api will be called.")

    # check if script is precessed well
    try:
        full_scripts, summary_scripts = get_full_and_summary_scripts(
            video_id, need_refine
        )
    except KeyboardInterrupt:
        raise KeyboardInterrupt
    except:
        print(f"[Error] video_id ({video_id}) : gpt summary process is wrong.")
        raise

    # check if summarization is well done.
    if full_scripts == None or summary_scripts == None:
        print(
            f"[Error] video_id ({video_id}) : script is none. summary might be wrong."
        )
        raise

    if "*" not in summary_scripts[0]["content-en"]:
        print(f"[Error] video_id ({video_id}) : summary format is wrong.")
        raise

    # Add content-ko
    full_scripts_add_ko(full_scripts)
    summary_scripts_add_ko(summary_scripts)

    # if script preprocessing and summarization are well done, save the data with embedding vectors
    print("Everything seems right.")
    print("Scripts are being preprocessed and saved.")

    # embedding process
    add_embedding_vector(summary_scripts, video_data)

    # data saving process
    save_video(session, video_data)
    v = get_video_by_url_type_and_url_key(session, "youtube", video_id)
    video_id = v.id

    for fscr in full_scripts:
        input_data = {}
        input_data["video_id"] = video_id
        input_data["start_time"] = fscr["start"]
        input_data["line_id"] = fscr["line_id"]
        input_data["content_en"] = fscr["content-en"]
        input_data["content_ko"] = fscr["content-ko"]
        input_data["summary_script_id"] = None
        save_full_script(session, deepcopy(input_data))

    for sscr in summary_scripts:
        input_data = {}
        input_data["video_id"] = video_id
        input_data["chunk_id"] = sscr["id"]
        input_data["content_en"] = sscr["content-en"]
        input_data["content_ko"] = sscr["content-ko"]
        input_data["embedded_vector"] = sscr["embeddings"]
        summary_script = save_summary_script(session, input_data)

        for idx, line_id in enumerate(sscr["full_script_ids"]):
            fs = update_full_script(
                session=session,
                url_type=video_data["url_type"],
                url_key=video_data["url_key"],
                line_id=line_id,
                summary_script_id=summary_script.id,
            )
            if idx == 0:
                input_data["start_id"] = fs.id

        input_data["line_count"] = len(sscr["full_script_ids"])

        update_summary_script_start_id(
            session, summary_script.id, input_data["start_id"], input_data["line_count"]
        )

    print(f"insertion done. Video Title : {video_data['title']}")


def processing_arguments(session) -> None:
    global video_keys

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-s", "--source", required=True, type=str, help="youtube video list"
    )

    args = parser.parse_args()
    # read video list source and save it as list format.
    with open(args.source, "r") as f:
        video_list = [line.strip() for line in f.readlines()]

    # duplication check between video_ids in a video_list
    video_list = list(set(video_list))

    # iterate all video_ids
    good, bad = 0, 0
    for idx, video_id in enumerate(video_list):
        print(f"{idx+1}th video is being processed : {video_id}")
        is_present = any(row[0] == video_id for row in video_keys)
        if is_present:  # check if the video is in the database
            print(f"[Error] video_id ({video_id}) : video is already in the db")
            bad += 1
            continue
        try:  # if it is not in, insert video
            insert_video(session, video_id)
            good += 1
        except KeyboardInterrupt:  # finish the process if interrupted by keyboard
            print("Program interrupted by user. Exiting...")
            break
        except:  # if other error occured, just skip the video and continue
            bad += 1
            continue

    print(f"Total, succeed : {good}, failure : {bad}")


if __name__ == "__main__":
    session = SessionLocal()
    try:
        video_keys = session.query(Video.url_key).all()
        processing_arguments(session)
    finally:
        session.close()
