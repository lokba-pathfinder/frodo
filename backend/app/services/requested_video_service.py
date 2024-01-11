from sqlalchemy.orm import Session
from app.models.requested_video import RequestedVideo


def save_requested_video_if_unique(
    session: Session, request_url: str, user_uuid: str
) -> bool:
    if (
        session.query(RequestedVideo)
        .filter_by(request_url=request_url, user_uuid=user_uuid)
        .first()
    ):
        return False
    else:
        video = RequestedVideo(request_url=request_url, user_uuid=user_uuid)
        session.add(video)
        session.commit()
    return True
