import { VideoInfo as VideoInfoType } from '../../../types/api';
import { PropsWithClassName } from '../../../types/utils';
import classNames from '../../../utils/classNames';
import ChannelMetaData from './ChannelMetaData';
import VideoMetaData from './VideoMetaData';
import VideoTitle from './VideoTitle';
import * as styles from './styles.css';

export interface VideoInfoProps extends PropsWithClassName {
  videoInfo: VideoInfoType;
}

const VideoInfo = ({ videoInfo, className }: VideoInfoProps) => {
  const { title, viewCount, publishedAt, channelImageUrl, channelTitle } = videoInfo;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.metaDataContainer}>
        <ChannelMetaData channelImageUrl={channelImageUrl} channelTitle={channelTitle} />
        <VideoMetaData viewCount={viewCount} publishedAt={publishedAt} />
      </div>
      <VideoTitle title={title} />
    </div>
  );
};

export default VideoInfo;
