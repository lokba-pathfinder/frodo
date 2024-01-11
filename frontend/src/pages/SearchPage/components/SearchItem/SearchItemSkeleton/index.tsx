import * as styles from './styles.css';

const SearchItemSkeleton = () => (
  <div className={styles.container}>
    <div className={styles.thumbnail} />
    <div className={styles.contents}>
      <div className={styles.title}>
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
      <div className={styles.channelMetaData}>
        <div className={styles.channelThumbnail} />
        <div className={styles.channelTitle} />
      </div>
      <div className={styles.videoMetaData} />
    </div>
  </div>
);

export default SearchItemSkeleton;
