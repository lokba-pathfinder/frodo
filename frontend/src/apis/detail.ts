import { ResponseDataWithMessage } from '../types/api';
import { FullScript, SummaryScript } from '../types/detail';
import { http } from './config';

// 전체 스크립트 조회 API
export const fetchFullScripts = (videoId: string) =>
  http.get<ResponseDataWithMessage<FullScript[]>>(`/api/full-scripts/${videoId}`);

// 요약 스크립트 조회 API
export const fetchSummaryScripts = (videoId: string) =>
  http.get<ResponseDataWithMessage<SummaryScript[]>>(`/api/summary-scripts/${videoId}`);
