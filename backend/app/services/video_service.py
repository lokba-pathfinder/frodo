from app.models.video import Video
from sqlalchemy.orm import Session


def save_video(session: Session, video_data):
    """비디오를 db에 저장하는 함수입니다.
    dictionary 형태의 video를 넣어주세요.

    Args:
        session (Session): _description_
        video_data (dict(Video)): video_data = {
            "url_type": url_type,
            "url_key": url_key,
            "title": title,
            "image_url": image_url,
            "total_time": total_time,
            "view_count": view_count,
            "published_at": published_at,
            "channel_name": channel_name,
            "channel_image_url": channel_image_url
        }

    Returns:
        _type_: Video
    """
    video = Video(**video_data)
    session.add(video)
    session.commit()
    session.refresh(video)
    return video


def get_video(session: Session, id):
    return session.query(Video).get(id)


def get_video_by_url_type_and_url_key(db: Session, url_type: str, url_key: str):
    return (
        db.query(Video)
        .filter(Video.url_type == url_type, Video.url_key == url_key)
        .first()
    )


def delete_video(session: Session, url_key: str, url_type="youtube") -> None:
    video = get_video_by_url_type_and_url_key(session, url_type, url_key)
    if video is not None:
        session.delete(video)
        session.commit()


def check_video_existence(db: Session, url_key: str) -> bool:
    video = db.query(Video).filter(Video.url_key == url_key).first()
    if video:
        return True
    else:
        return False


def get_youtube_video_by_url_key(db: Session, url_key: str):
    return (
        db.query(Video)
        .filter(Video.url_type == "youtube", Video.url_key == url_key)
        .first()
    )
