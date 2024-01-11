export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formattedHours = hours > 0 ? String(hours).padStart(2, '0') : '00';
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  if (hours > 0) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const formatViewCount = (viewCount: number) => {
  if (Number.isNaN(viewCount)) {
    return { ko: '알 수 없음', en: 'Unknown' };
  }
  if (viewCount <= 0) {
    return { ko: '조회수 없음', en: 'No views' };
  }
  // ~ 1천 : 조회수 XXX회
  if (viewCount < 1000) {
    return { ko: `조회수 ${viewCount}회`, en: `Views ${viewCount}` };
  }
  // 1천 ~ 1만 : 조회수 X.X천회
  if (viewCount < 10000) {
    const formattedViewCount = (viewCount / 1000).toFixed(1);
    return { ko: `조회수 ${formattedViewCount}천회`, en: `Views ${formattedViewCount}K` };
  }
  // 1만 ~ 100만 : '조회수 XX.X만회'
  if (viewCount < 1000000) {
    const formattedViewCount = (viewCount / 10000).toFixed(1);
    return { ko: `조회수 ${formattedViewCount}만회`, en: `Views ${formattedViewCount}0K` };
  }
  // 100만 ~ 1억 : '조회수 XXXX만회'
  if (viewCount < 100000000) {
    const formattedViewCount = Math.floor(viewCount / 10000);
    return { ko: `조회수 ${formattedViewCount}만회`, en: `Views ${formattedViewCount}0K` };
  }
  // 1억회 ~ : '조회수 XXXX억회'
  const formattedViewCount = Math.floor(viewCount / 100000000);
  return { ko: `조회수 ${formattedViewCount}억회`, en: `Views ${formattedViewCount}00M` };
};

export const formatPublishedAt = (publishedAt: string): { ko: string; en: string } => {
  const currentDate = new Date();
  const publishedDate = new Date(publishedAt);

  const timeDiff = currentDate.getTime() - publishedDate.getTime(); // 초 단위 차이
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 일 단위 차이

  if (Number.isNaN(daysDiff)) {
    return { ko: '알 수 없음', en: 'Unknown' };
  }
  if (daysDiff < 1) {
    return { ko: '방금 전', en: 'Just now' };
  }
  if (daysDiff < 30) {
    return { ko: `${daysDiff}일 전`, en: `${daysDiff} days ago` };
  }
  if (daysDiff < 365) {
    const monthsAgo = Math.floor(daysDiff / 30);
    return { ko: `${monthsAgo}달 전`, en: `${monthsAgo} months ago` };
  }
  const yearsAgo = Math.floor(daysDiff / 365);
  return { ko: `${yearsAgo}년 전`, en: `${yearsAgo} years ago` };
};
