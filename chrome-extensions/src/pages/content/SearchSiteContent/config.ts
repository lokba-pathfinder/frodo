export type Site = 'google' | 'naver' | 'daum';

type Content = {
  id: string;
  selector: string;
};

export const ELEMENTS: {
  [key in Site]: {
    SIDEBAR_CONTAINER: Content;
    TARGET_CONTAINER: Content;
    CONTENT_ROOT: Content;
    QUERY: Content;
  };
} = {
  google: {
    SIDEBAR_CONTAINER: {
      id: 'rhs',
      selector: '#rhs',
    },
    TARGET_CONTAINER: {
      id: 'rcnt',
      selector: '#rcnt',
    },
    CONTENT_ROOT: {
      id: 'pinnect-ai-content-root',
      selector: '#pinnect-ai-content-root',
    },
    QUERY: {
      id: 'APjFqb',
      selector: '#APjFqb',
    },
  },
  naver: {
    SIDEBAR_CONTAINER: {
      id: 'sub_pack',
      selector: '#sub_pack',
    },
    TARGET_CONTAINER: {
      id: 'content',
      selector: '#content',
    },
    CONTENT_ROOT: {
      id: 'pinnect-ai-content-root',
      selector: '#pinnect-ai-content-root',
    },
    QUERY: {
      id: 'nx_query',
      selector: '#nx_query',
    },
  },
  daum: {
    SIDEBAR_CONTAINER: {
      id: 'mAside',
      selector: '#mAside',
    },
    TARGET_CONTAINER: {
      id: 'cMain',
      selector: '#cMain',
    },
    CONTENT_ROOT: {
      id: 'pinnect-ai-content-root',
      selector: '#pinnect-ai-content-root',
    },
    QUERY: {
      id: 'q',
      selector: '#q',
    },
  },
};
