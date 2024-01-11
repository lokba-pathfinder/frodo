from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import JSONResponse
from app.db.session import get_db
from app.models import *
from app.schemas.summary_script_dto import summary_scripts_to_summary_srcipt_dtos
from app.schemas.response_dto import ResponseDto
from app.schemas.error_dto import ErrorDto
from app.services.full_script_service import *
from app.services.summary_script_service import *
from app.services.video_service import *


router = APIRouter()


@router.get("/summary-scripts/{videoId}")
def get_sum_scripts(videoId: str, db: Session = Depends(get_db)):
    video = get_video_by_url_type_and_url_key(db, "youtube", videoId)
    summary_scripts = get_summaries_by_video_id(db, video.id)
    summary_scripts_dtos = summary_scripts_to_summary_srcipt_dtos(summary_scripts)

    return {"data": summary_scripts_dtos}


@router.get("/v3/summary-scripts/{videoId}")
def get_sum_scripts_v3(videoId: str, db: Session = Depends(get_db)):
    try:
        video = get_video_by_url_type_and_url_key(db, "youtube", videoId)
        summary_scripts = get_summaries_by_video_id(db, video.id)
        summary_scripts_dtos = summary_scripts_to_summary_srcipt_dtos(summary_scripts)
    except:
        return JSONResponse(
            status_code=404,
            content=ErrorDto(
                code="e002001",
                message="존재하지 않는 동영상으로 부터 요약 스크립트를 가져올 수 없습니다.",
                data=None,
            ).dict(),
        )
    return ResponseDto(
        code="s002001",
        message="요약 스크립트를 성공적으로 가져왔습니다.",
        data={"summaryScripts": summary_scripts_dtos},
    )
