import { MESSAGE } from '@src/configs/messages';
import { useEffect, useState } from 'react';

type Response = { isVideoExisted: boolean };

const useIsVideoExisted = (
  videoId: string,
  options: {
    autoFetch?: boolean;
  } = { autoFetch: false },
) => {
  const [fetched, setFetched] = useState(false);
  const [isVideoExisted, setIsVideoExisted] = useState(false);

  const fetchIsVideoExistedFromBackground = () => {
    chrome.runtime.sendMessage(
      {
        message: MESSAGE.CHECK_IS_VIDEO_EXISTED,
        payload: { videoId },
      },
      (response: Response) => {
        if (response === undefined || response.isVideoExisted === undefined) {
          return;
        }

        setIsVideoExisted(response.isVideoExisted);
        setFetched(true);
      },
    );
  };

  useEffect(() => {
    // 데이터를 요청하고 응답을 받아오는 함수 호출
    if (options.autoFetch) {
      fetchIsVideoExistedFromBackground();
    }
  }, [videoId, options]);

  return { isVideoExisted, fetchIsVideoExistedFromBackground, fetched };
};

export default useIsVideoExisted;
