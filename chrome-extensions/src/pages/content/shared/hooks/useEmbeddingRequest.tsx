import { MESSAGE } from '@src/configs/messages';
import { useEffect, useState } from 'react';

export interface EmbeddingRequestResult {
  type: 'success' | 'failure' | 'pending';
  message: {
    en: string;
    ko: string;
  };
}

type Response = { result: EmbeddingRequestResult };

const DEFAULT_EMBEDDING_REQUEST_RESULT: EmbeddingRequestResult = {
  type: 'pending',
  message: {
    en: 'Request video embedding.',
    ko: '동영상 임베딩을 요청하세요.',
  },
};

const useEmbeddingRequest = (videoId: string, autoRequest = false) => {
  const [embeddingRequestResult, setEmbeddingRequestResult] = useState<EmbeddingRequestResult>(
    DEFAULT_EMBEDDING_REQUEST_RESULT,
  );

  const requestEmbeddingFromBackground = () => {
    chrome.runtime.sendMessage(
      {
        message: MESSAGE.REQUEST_EMBEDDING,
        payload: { videoId },
      },
      (response: Response) => {
        if (response === undefined || response.result === undefined) {
          return;
        }

        setEmbeddingRequestResult(response.result);
      },
    );
  };

  useEffect(() => {
    // 데이터를 요청하고 응답을 받아오는 함수 호출
    if (autoRequest) {
      requestEmbeddingFromBackground();
    }
  }, [videoId]);

  return { embeddingRequestResult, requestEmbeddingFromBackground };
};

export default useEmbeddingRequest;
