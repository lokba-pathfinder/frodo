from pydantic import BaseModel


class UserDto(BaseModel):
    userId: str
