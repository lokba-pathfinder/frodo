"""
    현재 .zshrc 에 저장된 환경변수의 데이터베이스를 초기화 합니다.
    example : python init_db.py

"""
from app.db.database import Base
from app.db.session import engine
from app.models.video import Video
from app.models.full_script import FullScript
from app.models.summary_script import SummaryScript
from app.models.requested_video import RequestedVideo


# Create all tables in the database
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)
