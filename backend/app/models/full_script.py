from sqlalchemy import Column, Integer, String, ARRAY, Float, ForeignKey, BigInteger
from sqlalchemy.orm import relationship
from app.db.database import Base


class FullScript(Base):
    __tablename__ = "full_scripts"

    # Column
    id = Column(BigInteger, primary_key=True, index=True)
    video_id = Column(BigInteger, ForeignKey("videos.id"))
    summary_script_id = Column(BigInteger, ForeignKey("summary_scripts.id"))
    start_time = Column(Integer)
    line_id = Column(Integer)
    content_en = Column(String)
    content_ko = Column(String)

    # relationship
    video = relationship("Video", back_populates="full_scripts")
    summary_script = relationship("SummaryScript", back_populates="full_scripts")
