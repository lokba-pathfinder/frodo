from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from app.db.session import get_db
from app.models import *
from app.schemas.full_script_dto import full_scripts_to_full_srcipt_dtos
from app.schemas.response_dto import ResponseDto
from app.schemas.error_dto import ErrorDto
from app.services.full_script_service import *
from app.services.summary_script_service import *
from app.services.video_service import *

router = APIRouter()


@router.get("/full-scripts/{videoId}")
def get_full_scripts(videoId: str, db: Session = Depends(get_db)):
    video = get_video_by_url_type_and_url_key(db, "youtube", videoId)
    full_scripts = get_full_scripts_by_video_id(db, video.id)
    full_scripts_dtos = full_scripts_to_full_srcipt_dtos(full_scripts)

    return {"data": full_scripts_dtos}


@router.get("/v3/full-scripts/{videoId}")
def get_full_scripts_v3(videoId: str, db: Session = Depends(get_db)):
    try:
        video = get_video_by_url_type_and_url_key(db, "youtube", videoId)
        full_scripts = get_full_scripts_by_video_id(db, video.id)
        full_scripts_dtos = full_scripts_to_full_srcipt_dtos(full_scripts)
    except:
        return JSONResponse(
            status_code=404,
            content=ErrorDto(
                code="e001001",
                message="존재하지 않는 동영상으로 부터 전체 스크립트를 가져올 수 없습니다.",
                data=None,
            ).dict(),
        )

    return ResponseDto(
        code="s001001",
        message="전체 스크립트를 성공적으로 가져왔습니다.",
        data={"fullScripts": full_scripts_dtos},
    )
