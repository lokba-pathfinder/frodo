import sys
import argparse
from app.db.session import SessionLocal
from app.models import *
from app.services.full_script_service import *
from app.services.summary_script_service import *
from app.services.video_service import *


def processing_arguments(session) -> None:
    global video_keys

    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--id", required=True, type=str, help="youtube video id")
    args = parser.parse_args()

    is_present = any(row[0] == args.id for row in video_keys)

    if not is_present:
        print(f"[Error] video_id ({args.id}) : video is not in the db")
        sys.exit()

    delete_full_script(session, url_key=args.id)
    delete_summary_scripts(session, url_key=args.id)
    delete_video(session, url_key=args.id)

    print(f"delete done. Video id : {args.id}")


if __name__ == "__main__":
    session = SessionLocal()
    try:
        video_keys = session.query(Video.url_key).all()
        processing_arguments(session)
    finally:
        session.close()
