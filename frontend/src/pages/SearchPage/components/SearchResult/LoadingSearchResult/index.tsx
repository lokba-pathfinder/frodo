import VideoInfoSkeleton from '../../../../../components/modules/VideoInfo/VideoInfoSkeleton';
import YoutubePlayerSkeleton from '../../../../../components/modules/YoutubePlayer/YoutubePlayerSkeleton';
import SimilarityScriptSkeleton from '../../SimilarityScript/SimilarityScriptSkeleton';

const LoadingResultSkeleton = () => (
  <>
    <YoutubePlayerSkeleton />
    <VideoInfoSkeleton />
    <SimilarityScriptSkeleton itemCount={10} />
  </>
);

export default LoadingResultSkeleton;
