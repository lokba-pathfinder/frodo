import { MESSAGE } from '@src/configs/messages';
import { SummaryScript } from '@src/configs/types';
import { useEffect, useState } from 'react';

type Response = { summaryScripts: SummaryScript[] };

const useSummaryScripts = (
  videoId: string,
  options: {
    autoFetch?: boolean;
  } = { autoFetch: false },
) => {
  const [summaryScripts, setSUmmaryScripts] = useState<SummaryScript[]>([]);
  const [fetched, setFetched] = useState(false);

  // background 로부터 데이터를 요청하고 응답을 상태로 저장해요.
  const fetchSummaryScriptsFromBackground = () => {
    chrome.runtime.sendMessage(
      {
        message: MESSAGE.GET_SUMMARY_SCRIPTS,
        payload: { videoId },
      },
      (response: Response) => {
        if (response === undefined || response.summaryScripts === undefined) {
          return;
        }
        setSUmmaryScripts(response.summaryScripts);
        setFetched(true);
      },
    );
  };

  useEffect(() => {
    // 데이터를 요청하고 응답을 받아오는 함수 호출
    if (options.autoFetch) {
      fetchSummaryScriptsFromBackground();
    }
  }, [videoId, options]);

  return { fetched, summaryScripts, fetchSummaryScriptsFromBackground };
};

export default useSummaryScripts;
