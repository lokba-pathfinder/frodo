from fastapi import APIRouter, Response
from fastapi import Depends
from fastapi.responses import JSONResponse

from app.db.session import get_db
from app.schemas.user_dto import *
from app.schemas.video_dto import *
from app.schemas.response_dto import ResponseDto
from app.schemas.error_dto import ErrorDto
from app.services.requested_video_service import *
from app.services.video_service import *

router = APIRouter()


@router.head("/v2/videos/{videoId}")
def head_video(videoId: str, db: Session = Depends(get_db)):
    if check_video_existence(db, videoId):
        return Response(status_code=200)
    else:
        return Response(status_code=404)


@router.get("/v2/videos/{videoId}")
def get_video(videoId: str, db: Session = Depends(get_db)):
    video = get_youtube_video_by_url_key(db, videoId)
    if video:
        return video_to_video_dto(video)
    else:
        return Response(status_code=404)


@router.post("/v2/videos/{videoId}/embedding")
def post_video_embedding(videoId: str, UserDto: UserDto, db: Session = Depends(get_db)):
    if check_video_existence(db, videoId):
        return Response(status_code=404)

    if save_requested_video_if_unique(db, videoId, UserDto.userId):
        return Response(status_code=200)
    else:
        return Response(status_code=409)


@router.head("/v3/videos/{videoId}")
def head_video_v3(videoId: str, db: Session = Depends(get_db)):
    if check_video_existence(db, videoId):
        return ResponseDto(code="s003001", message="존재하는 비디오입니다.", data=None)
    else:
        return JSONResponse(
            status_code=404,
            content=ErrorDto(
                code="e003001", message="존재하지 않는 비디오입니다.", data=None
            ).dict(),
        )


@router.get("/v3/videos/{videoId}")
def get_video_v3(videoId: str, db: Session = Depends(get_db)):
    video = get_youtube_video_by_url_key(db, videoId)
    if video:
        return ResponseDto(
            code="s004001",
            message="존재하는 비디오에 대한 정보입니다.",
            data={"videoInfo": video_to_video_dto(video)},
        )
    else:
        return JSONResponse(
            status_code=404,
            content=ErrorDto(
                code="e004001", message="존재하지 않는 비디오로부터 정보를 가져올 수 없습니다.", data=None
            ).dict(),
        )


@router.post("/v3/videos/{videoId}/embedding")
def post_video_embedding_v3(
    videoId: str, UserDto: UserDto, db: Session = Depends(get_db)
):
    if check_video_existence(db, videoId):
        return JSONResponse(
            status_code=404,
            content=ErrorDto(
                code="e005001", message="이미 비디오 정보를 제공하고 있는 동영상 입니다.", data=None
            ).dict(),
        )

    if save_requested_video_if_unique(db, videoId, UserDto.userId):
        return ResponseDto(code="s005001", message="성공적으로 요청이 저장되었습니다.", data=None)
    else:
        return JSONResponse(
            status_code=409,
            content=ErrorDto(
                code="e005002",
                message="동일한 사용자로부터 동일한 동영상에 대한 요청이 저장되어 있습니다.",
                data=None,
            ).dict(),
        )
