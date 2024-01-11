from sqlalchemy.orm import Session
from app.models.full_script import FullScript
from app.services import video_service


def save_full_script(session: Session, full_script_data):
    """_summary_

    Args:
        session (Session):
        full_script_data (dict(FullScript)):

    Returns:
        _type_: _description_
    """
    full_script = FullScript(**full_script_data)

    session.add(full_script)
    session.commit()
    session.refresh(full_script)
    return full_script


def get_full_script(session, id) -> FullScript:
    full_script = session.query(FullScript).get(id)
    return full_script


def get_full_scripts_by_video_id(session, video_id):
    return (
        session.query(FullScript)
        .filter(FullScript.video_id == video_id)
        .order_by(FullScript.line_id)
        .all()
    )


def update_full_script(session: Session, url_type, url_key, line_id, summary_script_id):
    """full_script를 처음 테이블에 추가하면서 넣지 못한 값들을 채우기 위해 사용합니다.
        요약 이후에 채워질 수 있는 값(summary_script_id와 embedded_vector)을 넣어줍니다.

    Args:
        session (Session):
        url_type (String) :
        url_key (String): url_type과 함께 동영상을 특정하는 역할
        line_id (int): 동영상에서 라인을 특정
        summary_script_id (int): 어떤 summary_id와 매핑될 것인지
        embedded_vector (float[]): embedded_vector

    Returns:
        _type_: FullScript
    """
    video = video_service.get_video_by_url_type_and_url_key(session, url_type, url_key)
    full_script = (
        session.query(FullScript)
        .filter(FullScript.video_id == video.id, FullScript.line_id == line_id)
        .first()
    )

    full_script.summary_script_id = summary_script_id

    session.commit()
    session.refresh(full_script)
    return full_script


def get_full_scripts_by_video_id(session, video_id):
    return (
        session.query(FullScript)
        .filter(FullScript.video_id == video_id)
        .order_by(FullScript.line_id)
        .all()
    )


def delete_full_script(session: Session, url_key: str) -> None:
    video_id = video_service.get_video_by_url_type_and_url_key(
        session, "youtube", url_key
    ).id
    full_scripts = get_full_scripts_by_video_id(session, video_id)
    for full_script in full_scripts:
        session.delete(full_script)
    session.commit()
