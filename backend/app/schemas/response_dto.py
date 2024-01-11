from pydantic import BaseModel, Field, constr
from typing import Any


class ResponseDto(BaseModel):
    code: str = Field(pattern="^s[0-9]{6}$")
    message: str
    data: Any
