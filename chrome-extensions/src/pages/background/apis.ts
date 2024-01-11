import { API_BASE_URL } from '@src/configs/constants';
import { ResponseDataWithMessage, FullScript, SummaryScript, SearchItem } from '@src/configs/types';
import { EmbeddingRequestResult } from '@src/pages/content/shared/hooks/useEmbeddingRequest';

// 전체 스크립트 조회 API
export const fetchFullScripts = async (videoId: string) => {
  const res = await fetch(`${API_BASE_URL}/full-scripts/${videoId}`);
  const data = (await res.json()) as ResponseDataWithMessage<FullScript[]>;

  return data.data;
};

// 요약 스크립트 조회 API
export const fetchSummaryScripts = async (videoId: string) => {
  const res = await fetch(`${API_BASE_URL}/summary-scripts/${videoId}`);
  const data = (await res.json()) as ResponseDataWithMessage<SummaryScript[]>;

  return data.data;
};

// 검색 결과 조회 API
export const fetchSearchResult = async (query: string) => {
  const res = await fetch(`${API_BASE_URL}/v2/search?query=${query}`);
  const data = (await res.json()) as ResponseDataWithMessage<SearchItem[]>;

  return data.data;
};

// 비디오 존재 유무 확인 API
export const fetchIsVideoExisted = async (videoId: string) => {
  const res = await fetch(`${API_BASE_URL}/v2/videos/${videoId}`, {
    method: 'HEAD',
  });
  const { status } = res;

  // 200 : 임베딩된 비디오가 존재합니다.
  // 404 : 임베딩된 비디오가 존재하지 않습니다.
  return status === 200;
};

// 비디오 임베딩 요청 API
export const requestEmbedding = async (
  videoId: string,
  userId: string,
): Promise<EmbeddingRequestResult> => {
  const res = await fetch(`${API_BASE_URL}/v2/videos/${videoId}/embedding`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
    }),
  });
  const { status } = res;

  if (status === 200) {
    return {
      type: 'success',
      message: {
        en: 'Embedding request was successful.',
        ko: '임베딩 요청을 성공했어요.',
      },
    };
  }
  if (status === 404) {
    return {
      type: 'failure',
      message: {
        en: 'The video is already embedded. Please try refreshing.',
        ko: '이미 임베딩 된 동영상이에요. 새로고침을 시도해주세요.',
      },
    };
  }
  if (status === 409) {
    return {
      type: 'failure',
      message: {
        en: 'The video has already been requested for embedding.',
        ko: '이미 임베딩을 요청한 동영상이에요.',
      },
    };
  }

  return {
    type: 'failure',
    message: {
      en: 'An unknown error occurred.',
      ko: '알 수 없는 오류가 발생했어요.',
    },
  };
};
