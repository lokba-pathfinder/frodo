from pydantic import BaseModel
from typing import List
from app.models.full_script import FullScript
from app.schemas.content import Contents


class FullScriptDto(BaseModel):
    id: str
    videoId: str
    contents: Contents
    summaryScriptId: str
    startTime: int


def full_scripts_to_full_srcipt_dtos(full_scripts: List[FullScript]):
    video_url_key = full_scripts[0].video.url_key
    full_script_dtos = []
    for full_script in full_scripts:
        contents = Contents(en=full_script.content_en, ko=full_script.content_ko)

        summaryScriptId = "None"
        if not full_script.summary_script == None:
            summaryScriptId = (
                video_url_key + "-sum-" + str(full_script.summary_script.id)
            )

        full_script_dto = FullScriptDto(
            id=video_url_key + "-full-" + str(full_script.id),
            videoId=str(video_url_key),
            contents=contents,
            summaryScriptId=summaryScriptId,
            startTime=full_script.start_time,
        )
        full_script_dtos.append(full_script_dto)
    return full_script_dtos
