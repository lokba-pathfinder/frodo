"""
    CLI명령어로 video id를 입력받으면, Database를 불러와서 data를 입력합니다.
    example : (frodo/backend 에서 실행)
        python -m data_preparation.insert_video -i "jObOjhUkf50"

"""
import argparse, sys
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


def processing_arguments(session) -> None:
    global video_keys

    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--id", required=True, type=str, help="youtube video id")

    args = parser.parse_args()
    is_present = any(row[0] == args.id for row in video_keys)
    need_refine = False

    # check if the video is already in the db
    if is_present:
        print(f"[Error] video_id ({args.id}) : video is already in the db")
        sys.exit()

    # check if the video is longer than 40 minutes
    video_data = get_video_info(args.id)
    assert video_data["total_time"] <= 2400, f"[Error] video_id ({args.id}) : too long"

    # check if english subtitle exists
    try:
        transcript_list = YouTubeTranscriptApi.list_transcripts(args.id)
        transcript = transcript_list.find_transcript(["en", "ko"])
    except:
        print(f"[Error] video_id ({args.id}) : can't find subtitle.")
        sys.exit()

    # check if the subtitle is auto-generated. If it is, refinement(whisper) is needed.
    if "Korean" in transcript.language or transcript.is_generated:
        need_refine = True
        print("refinement is needed. Whisper api will be called.")

    # check if script is precessed well
    try:
        full_scripts, summary_scripts = get_full_and_summary_scripts(
            args.id, need_refine
        )
    except:
        print(f"[Error] video_id ({args.id}) : gpt summary process is wrong.")
        sys.exit()

    # check if summarization is well done.
    if full_scripts == None or summary_scripts == None:
        print(f"[Error] video_id ({args.id}) : script is none. summary might be wrong.")
        sys.exit()

    if "*" not in summary_scripts[0]["content-en"]:
        print(f"[Error] video_id ({args.id}) : summary format is wrong.")
        sys.exit()

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
    v = get_video_by_url_type_and_url_key(session, "youtube", args.id)
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


if __name__ == "__main__":
    session = SessionLocal()
    try:
        video_keys = session.query(Video.url_key).all()
        processing_arguments(session)
    finally:
        session.close()
