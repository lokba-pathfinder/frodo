import { Link } from 'react-router-dom';

import ChannelMetaData from '../../../../../components/modules/VideoInfo/ChannelMetaData';
import VideoMetaData from '../../../../../components/modules/VideoInfo/VideoMetaData';
import VideoTitle from '../../../../../components/modules/VideoInfo/VideoTitle';
import YoutubePlayer from '../../../../../components/modules/YoutubePlayer';
import useGlobalLangState from '../../../../../hooks/useGlobalLangState';
import { SearchData } from '../../../../../types/api';
import { Contents, DetailPageLocationState } from '../../../../../types/detail';
import SimilarityScript from '../../SimilarityScript';
import * as styles from './styles.css';

const metaData: {
  linkText: Contents<string>;
} = {
  linkText: { ko: '상세 보기', en: 'View Details' },
};

interface HighlightedSearchResultProps {
  highlightedItem: SearchData;
  query: string;
}

const HighlightedSearchResult = ({ highlightedItem, query }: HighlightedSearchResultProps) => {
  const lang = useGlobalLangState();

  const {
    videoId,
    title,
    startTime,
    fullScriptId,
    summaryScript,
    viewCount,
    publishedAt,
    channelImageUrl,
    channelTitle,
    grade,
    score,
  } = highlightedItem;

  const locationState: DetailPageLocationState = {
    startTime,
    fullScriptId,
    summaryScriptId: summaryScript.id,
  };

  return (
    <>
      <YoutubePlayer videoId={videoId} initStartTime={startTime} />
      <div className={styles.contents}>
        <div className={styles.videoInfo}>
          <div className={styles.metaDataContainer}>
            <ChannelMetaData channelImageUrl={channelImageUrl} channelTitle={channelTitle} />
            <VideoMetaData viewCount={viewCount} publishedAt={publishedAt} />
          </div>
          <Link
            to={`/detail/${videoId}?query=${query}`}
            className={styles.link}
            state={locationState}
          >
            <VideoTitle title={title} />
          </Link>
        </div>
        <SimilarityScript contents={summaryScript.contents} grade={grade} score={score} />
      </div>
      <Link
        to={`/detail/${videoId}?query=${query}`}
        className={styles.linkButton}
        state={locationState}
      >
        {metaData.linkText[lang]}
      </Link>
    </>
  );
};

export default HighlightedSearchResult;
