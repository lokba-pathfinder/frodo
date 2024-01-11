import { Contents } from '../types/detail';

export const PLACEMENTS = [
  'top-start',
  'top-center',
  'top-end',
  'left',
  'right',
  'bottom-start',
  'bottom-center',
  'bottom-end',
] as const;

export const SUMMARY_SCRIPTS_TOOLTIP: Contents<string> = {
  en: 'If you click on the Summary Title, you can check the mapped Full Scripts and YouTube Video.',
  ko: '요약 제목을 클릭하면 매핑된 전체 스크립트와 유튜브 비디오를 확인할 수 있습니다.',
};

export const FULL_SCRIPTS_TOOLTIP: Contents<string> = {
  en: 'If you click on the Full Script, you can check the mapped Summary Scripts and YouTube Video.',
  ko: '전체 스크립트를 클릭하면 매핑된 요약 스크립트와 유튜브 비디오를 확인할 수 있습니다.',
};
