import * as styles from './styles.css';

const VideoInfoSkeleton = () => (
  <div className={styles.container}>
    <div className={styles.metaDataContainer}>
      <div className={styles.channelMetaData}>
        <div className={styles.img} />
        <div className={styles.channelTitle} />
      </div>
      <div className={styles.videoMetaData} />
    </div>
    <div className={styles.head} />
  </div>
);

export default VideoInfoSkeleton;
