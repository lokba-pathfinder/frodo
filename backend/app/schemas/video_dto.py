from pydantic import BaseModel
from datetime import date
from app.models.video import Video


class VideoDto(BaseModel):
    videoId: str
    channelImageUrl: str
    channelTitle: str
    viewCount: int
    publishedAt: date
    imageUrl: str
    title: str


def video_to_video_dto(video: Video):
    return VideoDto(
        videoId=video.url_key,
        channelImageUrl=video.channel_image_url,
        channelTitle=video.channel_name,
        viewCount=video.view_count,
        publishedAt=video.published_at,
        imageUrl=video.image_url,
        title=video.title,
    )
