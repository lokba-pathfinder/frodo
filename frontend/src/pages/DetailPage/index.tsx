import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import AxiosErrorFallback from '../../components/modules/AxiosErrorFallback';
import PageLayout from '../../components/modules/PageLayout';
import VideoInfo from '../../components/modules/VideoInfo';
import VideoInfoErrorFallback from '../../components/modules/VideoInfo/VideoInfoErrorFallback';
import VideoInfoSkeleton from '../../components/modules/VideoInfo/VideoInfoSkeleton';
import YoutubePlayer from '../../components/modules/YoutubePlayer';
import withVideoInfo from '../../hocs/withVideoInfo';
import FullScripts from './components/FullScripts';
import FullScriptsErrorFallback from './components/FullScripts/FullScriptsErrorFallback';
import FullScriptsSkeleton from './components/FullScripts/FullScriptsSkeleton';
import * as fullScriptsStyle from './components/FullScripts/styles.css';
import * as summaryScriptStyle from './components/SummaryScript/styles.css';
import SummaryScripts from './components/SummaryScripts';
import SummaryScriptsSkeleton from './components/SummaryScripts/SummaryScriptsSkeleton';
import useDetailPageState from './hooks/useDetailPageState';
import useScrollToHighlight from './hooks/useScrollToHighlight';
import * as styles from './styles.css';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

const VideoInfoWithFetching = withVideoInfo(VideoInfo);

const DetailPage = () => {
  const { reset } = useQueryErrorResetBoundary();

  const { fullScriptIds, summaryScriptId, startTime, videoId } = useDetailPageState();

  const { containerRef: leftScrollRef, scrollToHighlight: scrollToFullScriptsHighlight } =
    useScrollToHighlight<HTMLDivElement>(
      `[class*="${fullScriptsStyle.highlighted}"]`,
      fullScriptIds,
    );
  const { containerRef: rightScrollRef, scrollToHighlight: scrollToSummaryScriptsHighlight } =
    useScrollToHighlight<HTMLDivElement>(
      `[class*="${summaryScriptStyle.highlighted}"]`,
      summaryScriptId,
    );

  return (
    <PageLayout
      left={
        <div className={styles.contentsContainer.left} ref={leftScrollRef}>
          <YoutubePlayer videoId={videoId} initStartTime={startTime} />
          <div className={styles.leftContents}>
            <ErrorBoundary FallbackComponent={VideoInfoErrorFallback} onReset={reset}>
              <Suspense fallback={<VideoInfoSkeleton />}>
                <VideoInfoWithFetching videoId={videoId} />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={FullScriptsErrorFallback} onReset={reset}>
              <Suspense fallback={<FullScriptsSkeleton />}>
                <FullScripts videoId={videoId} onFetched={() => scrollToFullScriptsHighlight()} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      }
      right={
        <div className={styles.contentsContainer.right} ref={rightScrollRef}>
          <ErrorBoundary FallbackComponent={AxiosErrorFallback} onReset={reset}>
            <Suspense fallback={<SummaryScriptsSkeleton />}>
              <SummaryScripts
                videoId={videoId}
                onFetched={() => scrollToSummaryScriptsHighlight()}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      }
    />
  );
};

export default DetailPage;
