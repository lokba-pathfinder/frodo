from app.models.summary_script import SummaryScript
from app.services.video_service import get_video_by_url_type_and_url_key
from sqlalchemy.orm import Session


def save_summary_script(session: Session, summary_script_data):
    """_summary_

    Args:
        session (Session):
        script_data (dict(SummaryScript)):

    Returns:
        _type_: SummaryScript
    """
    summary_script = SummaryScript(**summary_script_data)
    session.add(summary_script)
    session.commit()
    session.refresh(summary_script)
    return summary_script


def get_summary_script(session, id):
    summary_script = session.query(SummaryScript).get(id)
    return summary_script


def get_summaries_by_video_id(db: Session, video_id: int):
    return (
        db.query(SummaryScript)
        .filter(SummaryScript.video_id == video_id)
        .order_by(SummaryScript.chunk_id)
        .all()
    )


def get_summary_script_by_video_id_and_chunk_id(session: Session, video_id, chunk_id):
    return (
        session.query(SummaryScript)
        .filter(SummaryScript.video_id == video_id, SummaryScript.chunk_id == chunk_id)
        .first()
    )


def save_summary_script_with_video_url_type_and_video_url_key(
    session: Session, url_type, url_key, **summary_script_data
):
    video_id = get_video_by_url_type_and_url_key(session, url_type, url_key).id

    summary_script = SummaryScript(**summary_script_data)
    summary_script.video_id = video_id
    session.add(summary_script)
    session.commit()
    session.refresh(summary_script)

    return summary_script


def update_summary_script_start_id(session: Session, id, start_id, line_count):
    summary_script = session.query(SummaryScript).get(id)
    summary_script.start_id = start_id
    summary_script.line_count = line_count
    session.commit()
    session.refresh(summary_script)

    return summary_script


def delete_summary_scripts(session: Session, url_key: str) -> None:
    video_id = get_video_by_url_type_and_url_key(session, "youtube", url_key).id
    summaries = get_summaries_by_video_id(session, video_id)
    for summary in summaries:
        session.delete(summary)
    session.commit()
