from pydantic import BaseModel, Field
from typing import Any


class ErrorDto(BaseModel):
    code: str = Field(pattern="^e[0-9]{6}$")
    message: str
    data: Any
