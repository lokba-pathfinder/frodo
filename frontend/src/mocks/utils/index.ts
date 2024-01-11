export const generateThumbnailUrl = (key: string) =>
  `https://img.youtube.com/vi/${key}/maxresdefault.jpg`;

// 항상 true를 반환합니다. 추후에 videoId 검증 로직이 들어가면 좋습니다.
export const isValidVideoId = (videoId: string | readonly string[]) => typeof videoId !== 'number';
