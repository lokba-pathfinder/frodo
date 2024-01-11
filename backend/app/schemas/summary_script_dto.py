from pydantic import BaseModel
from typing import List
from app.models.summary_script import SummaryScript
from app.schemas.content import SummaryScriptContents, db_content_to_content_detail


class SummarySrciptDto(BaseModel):
    id: str
    videoId: str
    contents: SummaryScriptContents
    fullScriptIds: List[str]
    startTime: int


def summary_scripts_to_summary_srcipt_dtos(
    summary_scripts: List[SummaryScript],
) -> List[SummarySrciptDto]:
    video = summary_scripts[0].video
    summary_script_dtos = []

    # summary_script_dto 하나 만들기
    for summary_script in summary_scripts:
        f_list = []
        for f_script in summary_script.full_scripts:
            f_list.append(video.url_key + "-full-" + str(f_script.id))

        contents = SummaryScriptContents(
            en=db_content_to_content_detail(summary_script.content_en),
            ko=db_content_to_content_detail(summary_script.content_ko),
        )
        summary_script_dto = SummarySrciptDto(
            id=video.url_key + "-sum-" + str(summary_script.id),
            videoId=video.url_key,
            fullScriptIds=f_list,
            contents=contents,
            startTime=summary_script.full_scripts[0].start_time,
        )
        summary_script_dtos.append(summary_script_dto)
    return summary_script_dtos
