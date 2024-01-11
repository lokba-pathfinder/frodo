import { SearchItem as SearchItemType } from '@src/configs/types';
import useGlobalLangState from '@src/pages/content/shared/hooks/useGlobalLangState';

interface SearchItemProps {
  searchItem: SearchItemType;
  active: boolean;
  onClick: (data: SearchItemType) => void;
}

const formatViewCount = (viewCount: number) => {
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

const formatPublishedAt = (publishedAt: string): { ko: string; en: string } => {
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

const SearchItem = ({ searchItem, active, onClick }: SearchItemProps) => {
  const lang = useGlobalLangState();
  const { imageUrl, title, viewCount, publishedAt } = searchItem;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={`searchItem-container ${active ? 'searchItem-container-active' : ''}`}
      onClick={() => onClick(searchItem)}
    >
      <img src={imageUrl} alt="thumbnail" className="searchItem-img" />
      <div className="searchItem-contents">
        <h3 className="searchItem-title">{title}</h3>
        <div className="searchItem-info">
          <p>{formatViewCount(viewCount)[lang]}</p>
          <p>•</p>
          <p>{formatPublishedAt(publishedAt)[lang]}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
