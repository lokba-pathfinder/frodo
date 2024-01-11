import * as styles from './styles.css';

interface ChannelMetaDataProps {
  channelImageUrl: string;
  channelTitle: string;
}

const ChannelMetaData = ({ channelImageUrl, channelTitle }: ChannelMetaDataProps) => (
  <div className={styles.container}>
    <img className={styles.img} src={channelImageUrl} alt="channel thumbnail" />
    <div className={styles.channelTitle}>{channelTitle}</div>
  </div>
);

export default ChannelMetaData;
