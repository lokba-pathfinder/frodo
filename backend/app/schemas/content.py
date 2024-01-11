from pydantic import BaseModel
from typing import List


class SummaryScriptContentDetail(BaseModel):
    title: str
    lines: List[str]


class Contents(BaseModel):
    en: str
    ko: str


class SummaryScriptContents(BaseModel):
    en: SummaryScriptContentDetail
    ko: SummaryScriptContentDetail


def db_content_to_content_detail(db_content: str) -> SummaryScriptContentDetail:
    db_content = db_content.rstrip("\n")
    splited = db_content.split("\n")
    title = (splited[0].split("(lines"))[0]
    lines = [x.strip("*" " ") for x in splited[1:]]
    return SummaryScriptContentDetail(title=title, lines=lines)
