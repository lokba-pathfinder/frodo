from typing import List
from pydantic import BaseModel
from app.models.full_script import FullScript
from app.models.summary_script import SummaryScript
from app.models.video import Video
from app.schemas.content import db_content_to_content_detail, SummaryScriptContents
from app.schemas.summary_script_dto import SummarySrciptDto


class SearchDto(BaseModel):
    media: str
    videoId: str
    imageUrl: str
    startTime: int
    totalTime: int
    fullScriptId: str
    title: str
    summaryScript: SummarySrciptDto


class SearchListDto(BaseModel):
    data: List[SearchDto]


def full_script_to_search_dto(full_script: FullScript) -> SearchDto:
    """
    유사도 높은 full_script 객체를 찾은 이후에
    검색 결과에서 보여줄 데이터 형식으로 만들어서 반환해주는 함수입니다.

    Args:
        full_script (FullScript):

    Returns:
        SearchDto: search_dto
    """
    video: Video = full_script.video
    summary_script: SummaryScript = full_script.summary_script

    f_list = []
    # for f_script in summary_script.full_scripts:
    #     f_list.append(video.url_key + "-full-" + str(f_script.id))

    contents = SummaryScriptContents(
        en=db_content_to_content_detail(summary_script.content_en),
        ko=db_content_to_content_detail(summary_script.content_ko),
    )

    summary_script_dto = SummarySrciptDto(
        id=video.url_key + "-sum-" + str(summary_script.id),
        videoId=video.url_key,
        fullScriptIds=f_list,
        contents=contents,
        startTime=full_script.start_time,
    )

    search_dto = SearchDto(
        media=video.url_type,
        videoId=video.url_key,
        imageUrl=video.image_url,
        startTime=full_script.start_time,
        totalTime=video.total_time,
        fullScriptId=video.url_key + "-full-" + str(full_script.id),
        title=video.title,
        summaryScript=summary_script_dto,
    )
    return search_dto
