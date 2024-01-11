"""
    Database 내부의 모든 비디오리스트의 video_id (db에선 url_key)를 읽어와서 video_list.txt에 저장합니다.

"""
from app.db.session import SessionLocal
from app.services.full_script_service import *
from app.services.summary_script_service import *
from app.services.video_service import *

# Create a new session
db = SessionLocal()

# Query all url_keys from Video table
url_keys = db.query(Video.url_key).all()

# Write url_keys to video_list.txt
with open("./test/video_list.txt", "w") as f:
    for url_key in url_keys:
        f.write(f"{url_key[0]}\n")

# Close the session
db.close()
