export interface ResponseDataWithMessage<T> {
  data: T;
  message: string;
}

export interface SummaryScriptContent {
  title: string;
  lines: string[];
}

export type Lang = 'en' | 'ko';

export interface Contents<T> {
  en: T;
  ko: T;
}

export interface FullScript {
  id: string;
  videoId: string; // 유튜브 동영상 ID
  summaryScriptId: string; // 매핑되는 요약 스크립트 ID
  contents: Contents<string>; // key(en, ko), value 형태로 이루어진 객체
  startTime: number; // 재생 시간 (sec)
}

export interface SummaryScript {
  id: string;
  videoId: string; // 유튜브 동영상 ID
  fullScriptIds: string[]; // 매핑되는 전체 스크립트 ID 배열
  contents: Contents<SummaryScriptContent>; // key(en, ko), value 형태로 이루어진 객체
  startTime: number; // 재생 시간 (sec)
}

export interface HighlightState {
  fullScriptIds: string[];
  summaryScriptId: string;
}

type Media = 'youtube';

export interface SearchItem {
  searchId: string;
  media: Media;
  videoId: string; // 유튜브 동영상 ID
  imageUrl: string; // 유튜브 썸네일 이미지 URL
  startTime: number; // 재생 시간 (sec)
  totalTime: number; // 전체 시간 (sec)
  fullScriptId: string; // 전체 스크립트 중 문맥을 고려한 문장 유사도가 가장 높은 ID
  title: string; // 동영상 제목
  summaryScript: SummaryScript; // 요약 스크립트
  viewCount: number;
  publishedAt: string; // YYYY-MM-DD 형식
  channelImageUrl: string;
  channelTitle: string;
}
