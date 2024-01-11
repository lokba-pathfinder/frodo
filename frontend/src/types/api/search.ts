import { SummaryScript } from '../detail';

type Media = 'youtube';

export interface SearchData {
  searchId: string; // 검색 ID
  media: Media;
  videoId: string; // 유튜브 동영상 ID
  imageUrl: string; // 유튜브 썸네일 이미지 URL
  startTime: number; // 재생 시간 (sec)
  totalTime: number; // 전체 시간 (sec)
  title: string; // 동영상 제목
  fullScriptId: string; // 전체 스크립트 중 문맥을 고려한 문장 유사도가 가장 높은 ID
  summaryScript: SummaryScript; // 요약 스크립트
  viewCount: number; // 조회수
  publishedAt: string; // 게시 날짜
  channelImageUrl: string; // 채널 썸네일 이미지 URL
  channelTitle: string; // 채널명
  grade: 'high' | 'medium' | 'low'; // 유사도 등급
  score: number; // 유사도 점수
}

export interface SearchResultAPI {
  pageParam: number;
  hasNext: boolean;
  total: number;
  searchDataList: SearchData[];
}
