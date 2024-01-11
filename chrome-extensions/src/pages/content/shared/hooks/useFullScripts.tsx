import { MESSAGE } from '@src/configs/messages';
import { FullScript } from '@src/configs/types';
import { useEffect, useState } from 'react';

type Response = { fullScripts: FullScript[] };

const useFullScripts = (
  videoId: string,
  options: {
    autoFetch?: boolean;
  } = { autoFetch: false },
) => {
  const [fullScripts, setFullScripts] = useState<FullScript[]>([]);
  const [fetched, setFetched] = useState(false);

  // background 로부터 데이터를 요청하고 응답을 상태로 저장해요.
  const fetchFullScriptsFromBackground = () => {
    chrome.runtime.sendMessage(
      {
        message: MESSAGE.GET_FULL_SCRIPTS,
        payload: { videoId },
      },
      (response: Response) => {
        if (response === undefined || response.fullScripts === undefined) {
          return;
        }

        setFullScripts(response.fullScripts);
        setFetched(true);
      },
    );
  };

  useEffect(() => {
    // 데이터를 요청하고 응답을 받아오는 함수 호출
    if (options.autoFetch) {
      fetchFullScriptsFromBackground();
    }
  }, [videoId, options]);

  return { fetched, fullScripts, fetchFullScriptsFromBackground };
};

export default useFullScripts;
