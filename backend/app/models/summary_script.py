from sqlalchemy import Column, Integer, String, ForeignKey, BigInteger, ARRAY, Float
from sqlalchemy.orm import relationship
from app.db.database import Base


class SummaryScript(Base):
    __tablename__ = "summary_scripts"

    # Column
    id = Column(BigInteger, primary_key=True, index=True)
    video_id = Column(BigInteger, ForeignKey("videos.id"))
    chunk_id = Column(Integer)
    content_en = Column(String)
    content_ko = Column(String)
    embedded_vector = Column(ARRAY(Float))
    start_id = Column(Integer)
    line_count = Column(Integer)

    # relationship
    video = relationship("Video", back_populates="summary_scripts")
    full_scripts = relationship(
        "FullScript", back_populates="summary_script", order_by="FullScript.line_id"
    )
