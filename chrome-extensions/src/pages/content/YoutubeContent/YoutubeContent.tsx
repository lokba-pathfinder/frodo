import IconButton from '@src/pages/content/YoutubeContent/components/IconButton';
import YoutubeContentContainer from '@src/pages/content/YoutubeContent/components/YoutubeContentContainer';
import useSearchParam from '@src/pages/content/YoutubeContent/hooks/useSearchParam';
import { useEffect, useState } from 'react';

import fullScriptsIcon from '@assets/full-scripts-icon.png';
import summaryScriptsIcon from '@assets/summary-scripts-icon.png';
import SummaryScriptCard from '@src/pages/content/YoutubeContent/components/SummaryScriptCard';
import FullScriptCard from '@src/pages/content/YoutubeContent/components/FullScriptCard';
import { Contents, HighlightState } from '@src/configs/types';
import useYoutubePlayer from '@src/pages/content/YoutubeContent/hooks/useYoutubePlayer';
import { findLast } from '@src/utils/array';
import useFullScripts from '@src/pages/content/shared/hooks/useFullScripts';
import useSummaryScripts from '@src/pages/content/shared/hooks/useSummaryScripts';
import useEmbeddingRequest from '@src/pages/content/shared/hooks/useEmbeddingRequest';
import EmbeddingRequestSection from '@src/pages/content/YoutubeContent/components/EmbeddingRequestSection';
import useIsVideoExisted from '@src/pages/content/shared/hooks/useIsVideoExisted';
import useGlobalLangState from '../shared/hooks/useGlobalLangState';

const data: { iconButtonText: { summaryScript: Contents<string>; fullScript: Contents<string> } } =
  {
    iconButtonText: {
      summaryScript: { en: 'Summary Scripts', ko: '요약 스크립트' },
      fullScript: { en: 'Full Scripts', ko: '전체 스크립트' },
    },
  };

const YOUTUBE_CONTENT = {
  NONE: -1,
  SUMMARY_SCRIPTS: 0,
  FULL_SCRIPTS: 1,
} as const;

export type YoutubeContentType = (typeof YOUTUBE_CONTENT)[keyof typeof YOUTUBE_CONTENT];

const YoutubeContent = () => {
  const lang = useGlobalLangState();

  const videoId = useSearchParam('v');
  const { fetched: fetchedIsVideoExisted, isVideoExisted } = useIsVideoExisted(videoId, {
    autoFetch: true,
  });
  const {
    fetched: fetchedSummaryScripts,
    summaryScripts,
    fetchSummaryScriptsFromBackground,
  } = useSummaryScripts(videoId);
  const {
    fetched: fetchedFullScripts,
    fullScripts,
    fetchFullScriptsFromBackground,
  } = useFullScripts(videoId);
  const [visibleContent, setVisibleContent] = useState<YoutubeContentType>(
    YOUTUBE_CONTENT.SUMMARY_SCRIPTS,
  );
  const [highlightState, setHighlightState] = useState<HighlightState | null>(null);
  const [startTime, setStartTime] = useState(0);
  const { embeddingRequestResult, requestEmbeddingFromBackground } = useEmbeddingRequest(videoId);

  const fetched = fetchedSummaryScripts && fetchedFullScripts;

  const { seekTo } = useYoutubePlayer((playTime: number) => {
    setStartTime(playTime);
  });

  const handleUpdate = (_highlightState: HighlightState, _startTime: number) => {
    setHighlightState({ ..._highlightState });
    seekTo(_startTime);
  };

  useEffect(() => {
    const matchedFullScript = findLast(
      fullScripts,
      (fullScript) => fullScript.startTime <= startTime,
    );

    if (matchedFullScript === undefined) {
      return;
    }

    setHighlightState({
      summaryScriptId: matchedFullScript.summaryScriptId,
      fullScriptIds: [matchedFullScript.id],
    });
  }, [startTime, fullScripts, setHighlightState, setStartTime]);

  // videoId에 대한 동영상 임베딩이 존재하면 데이터를 받아옵니다.
  useEffect(() => {
    if (isVideoExisted) {
      void fetchFullScriptsFromBackground();
      void fetchSummaryScriptsFromBackground();
    }
  }, [isVideoExisted]);

  // 첫 데이터 로딩이 되지 않은 경우 빈 화면을 표시합니다.
  if (!fetchedIsVideoExisted) {
    return <YoutubeContentContainer />;
  }

  // videoId에 대한 동영상 임베딩이 존재하지 않으면 임베딩을 요청할 수 있는 화면을 표시합니다.
  if (!isVideoExisted) {
    return (
      <YoutubeContentContainer>
        <EmbeddingRequestSection
          embeddingRequestResult={embeddingRequestResult}
          requestEmbedding={requestEmbeddingFromBackground}
        />
      </YoutubeContentContainer>
    );
  }

  // 스크립트 데이터를 모두 받아오면 화면에 스크립트를 표시합니다.
  return (
    <YoutubeContentContainer>
      {fetched && (
        <>
          <div className="youtube-content__script-buttons">
            <IconButton
              iconSrc={summaryScriptsIcon}
              text={data.iconButtonText.summaryScript[lang]}
              onClick={() => setVisibleContent(YOUTUBE_CONTENT.SUMMARY_SCRIPTS)}
              active={visibleContent === YOUTUBE_CONTENT.SUMMARY_SCRIPTS}
            />
            <IconButton
              iconSrc={fullScriptsIcon}
              text={data.iconButtonText.fullScript[lang]}
              onClick={() => setVisibleContent(YOUTUBE_CONTENT.FULL_SCRIPTS)}
              active={visibleContent === YOUTUBE_CONTENT.FULL_SCRIPTS}
            />
          </div>
          <div className="youtube-content__script-container">
            {visibleContent === YOUTUBE_CONTENT.SUMMARY_SCRIPTS ? (
              summaryScripts.map((summaryScript) => (
                <SummaryScriptCard
                  summaryScript={summaryScript}
                  key={summaryScript.id}
                  highlighted={summaryScript.id === highlightState?.summaryScriptId}
                  handleUpdate={handleUpdate}
                />
              ))
            ) : (
              <div className="youtube-content__script-container--full-scripts">
                {fullScripts.map((fullScript) => (
                  <FullScriptCard
                    fullScript={fullScript}
                    key={fullScript.id}
                    highlighted={highlightState?.fullScriptIds?.includes(fullScript.id)}
                    handleUpdate={handleUpdate}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </YoutubeContentContainer>
  );
};

export default YoutubeContent;
