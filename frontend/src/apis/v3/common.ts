import { VideoInfoAPI } from '../../types/api';
import { apiV3 } from './axios';

// 비디오 정보 조회 API
export const fetchVideoInfo = async (videoId: string) => {
  const responseData = await apiV3.get<VideoInfoAPI>(`/videos/${videoId}`);
  const { data } = responseData;

  return data;
};
