/* eslint-disable jsx-a11y/no-static-element-interactions */
import { MouseEventHandler } from 'react';

import useGlobalLangState from '../../../../hooks/useGlobalLangState';
import { SearchData } from '../../../../types/api';
import classNames from '../../../../utils/classNames';
import { formatPublishedAt, formatViewCount } from '../../../../utils/format';
import * as styles from './styles.css';

interface SearchItemProps {
  item: SearchData;
  isHighlighted?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const SearchItem = ({ item, isHighlighted = false, onClick }: SearchItemProps) => {
  const lang = useGlobalLangState();

  const { imageUrl, title, channelTitle, channelImageUrl, viewCount, publishedAt } = item;

  return (
    <div
      className={classNames(styles.container, [styles.highlighted, isHighlighted])}
      onClick={onClick}
    >
      <img src={imageUrl} alt="thumbnail" className={styles.thumbnail} />
      <div className={styles.contents}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.channelMetaData}>
          <img src={channelImageUrl} alt="channel thumbnail" className={styles.channelThumbnail} />
          <div className={styles.channelTitle}>{channelTitle}</div>
        </div>
        <div className={styles.videoMetaData}>
          {formatViewCount(viewCount)[lang]} ∙ {formatPublishedAt(publishedAt)[lang]}
        </div>
      </div>
    </div>
  );
};
export default SearchItem;
