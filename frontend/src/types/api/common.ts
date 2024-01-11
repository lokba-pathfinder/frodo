export interface VideoInfo {
  videoId: string;
  title: string;
  viewCount: number;
  publishedAt: string; // YYYY-MM-DD
  imageUrl: string; // 비디오 섬네일
  channelImageUrl: string;
  channelTitle: string;
}

export interface VideoInfoAPI {
  videoInfo: VideoInfo;
}
