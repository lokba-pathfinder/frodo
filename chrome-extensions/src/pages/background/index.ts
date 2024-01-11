import { MESSAGE, MessageType } from '@src/configs/messages';
import {
  fetchFullScripts,
  fetchIsVideoExisted,
  fetchSearchResult,
  fetchSummaryScripts,
  requestEmbedding,
} from '@src/pages/background/apis';
import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import { DEFAULT_LANG, PINNECT_AI_URL } from '@src/configs/constants';
import { v4 as uuidv4 } from 'uuid';

interface Request {
  message: MessageType;
  payload: Record<string, unknown>;
}

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

// 유저 아이디 등록
const registerUserId = () => {
  const userId = uuidv4();

  chrome.storage.sync.set({ userId }, () => {
    console.log(userId, 'is created');
  });

  return userId;
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: 'Search on Pinnect.ai',
    id: 'pinnect-ai-search-menu',
    contexts: ['selection'],
  });

  chrome.contextMenus.onClicked.addListener((event) => {
    const { selectionText } = event;

    if (selectionText !== undefined && event.menuItemId === 'pinnect-ai-search-menu') {
      void chrome.tabs.create({
        url: `${PINNECT_AI_URL}/search?query=${selectionText}`,
      });
    }
  });

  void chrome.storage.sync.set({ lang: DEFAULT_LANG });

  registerUserId();
});

chrome.runtime.onMessage.addListener((request: Request, sender, sendResponse) => {
  const sendFullScripts = async () => {
    const fullScripts = await fetchFullScripts(request.payload.videoId as string);
    sendResponse({ fullScripts });
  };

  const sendSummaryScripts = async () => {
    const summaryScripts = await fetchSummaryScripts(request.payload.videoId as string);
    sendResponse({ summaryScripts });
  };

  const sendSearchResult = async () => {
    const searchResult = await fetchSearchResult(request.payload.query as string);
    sendResponse(searchResult);
  };

  const sendIsVideoExisted = async () => {
    const isVideoExisted = await fetchIsVideoExisted(request.payload.videoId as string);
    sendResponse({ isVideoExisted });
  };

  const sendEmbeddingRequestResult = async () => {
    const storage = await chrome.storage.sync.get(['userId']);
    const userId = (storage?.userId as string) ?? registerUserId();

    const result = await requestEmbedding(request.payload.videoId as string, userId);
    sendResponse({ result });
  };

  const getStoredLang = () => {
    chrome.storage.sync.get(['lang'], (res) => {
      sendResponse(res.lang);
    });
  };

  const setStoredLang = () => {
    chrome.storage.sync.set({ lang: request.payload.lang }, () => {
      sendResponse(request.payload.lang);
    });
  };

  switch (request.message) {
    case MESSAGE.GET_FULL_SCRIPTS:
      void sendFullScripts();
      return true;
    case MESSAGE.GET_SUMMARY_SCRIPTS:
      void sendSummaryScripts();
      return true;
    case MESSAGE.GET_SEARCH_RESULT:
      void sendSearchResult();
      return true;
    case MESSAGE.CHECK_IS_VIDEO_EXISTED:
      void sendIsVideoExisted();
      return true;
    case MESSAGE.REQUEST_EMBEDDING:
      void sendEmbeddingRequestResult();
      return true;
    case MESSAGE.GET_STORED_LANG:
      getStoredLang();
      return true;
    case MESSAGE.SET_STORED_LANG:
      setStoredLang();
      return true;
    default:
      return true;
  }
});
