from sqlalchemy import Column, Integer, String, BigInteger, DateTime
from app.db.database import Base
from datetime import datetime


class RequestedVideo(Base):
    __tablename__ = "requested_videos"

    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    request_url = Column(String)
    user_uuid = Column(String)
    create_date = Column(DateTime, default=datetime.utcnow)
