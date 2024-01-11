from sqlalchemy import Column, Integer, String, BigInteger, Date
from sqlalchemy.orm import relationship
from app.db.database import Base


class Video(Base):
    __tablename__ = "videos"

    id = Column(BigInteger, primary_key=True, index=True)
    url_type = Column(String)
    url_key = Column(String)
    title = Column(String)
    image_url = Column(String)
    total_time = Column(Integer)
    channel_name = Column(String)
    channel_image_url = Column(String)
    view_count = Column(BigInteger)
    published_at = Column(Date)

    full_scripts = relationship(
        "FullScript", back_populates="video", order_by="FullScript.line_id"
    )
    summary_scripts = relationship(
        "SummaryScript", back_populates="video", order_by="SummaryScript.chunk_id"
    )
