import { createRoot } from 'react-dom/client';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { waitForElementReady } from '@src/utils/element-utils';
import YoutubeContent from '@src/pages/content/YoutubeContent/YoutubeContent';
import LangProvider from '../shared/provider/LangProvider';

refreshOnUpdate('pages/content');

const createContentRoot = () => {
  let contentRoot = document.querySelector('#pinnect-ai-content-root');

  if (contentRoot !== null) {
    contentRoot.remove();
  }

  contentRoot = document.createElement('div');
  contentRoot.id = 'pinnect-ai-content-root';

  return contentRoot;
};

const renderYoutube = async () => {
  const sidebar = await waitForElementReady('#columns > #secondary');
  const root = createContentRoot();

  sidebar.prepend(root);

  createRoot(root).render(
    <LangProvider>
      <YoutubeContent />
    </LangProvider>,
  );
};

// SPA로 작동하는 유튜브에서 URL 변경을 감지하고, 변경 시 컴포넌트를 렌더링해요.
const observeSPAUrlChanged = () => {
  let prevUrl = '';

  const observerForSPAReload = new MutationObserver(() => {
    if (prevUrl !== window.location.href) {
      prevUrl = window.location.href;

      if (window.location.hostname.match('youtube')?.[0] && window.location.pathname === '/watch') {
        void renderYoutube();
      }
    }
  });

  observerForSPAReload.observe(document.documentElement, { childList: true, subtree: true });
};

observeSPAUrlChanged();
