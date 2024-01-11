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

export interface DetailPageLocationState {
  startTime: number;
  fullScriptId: string;
  summaryScriptId: string;
}

export interface HighlightState {
  startTime: number;
  fullScriptIds: string[];
  summaryScriptId: string;
}
