import useGlobalLangState from '../../../../hooks/useGlobalLangState';
import { formatPublishedAt, formatViewCount } from '../../../../utils/format';
import * as styles from './styles.css';

interface VideoMetaDataProps {
  viewCount: number;
  publishedAt: string;
}

const VideoMetaData = ({ viewCount, publishedAt }: VideoMetaDataProps) => {
  const lang = useGlobalLangState();

  return (
    <div className={styles.container}>
      {formatViewCount(viewCount)[lang]} ∙ {formatPublishedAt(publishedAt)[lang]}
    </div>
  );
};

export default VideoMetaData;
