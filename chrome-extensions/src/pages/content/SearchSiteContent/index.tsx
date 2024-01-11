import { createRoot } from 'react-dom/client';

import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { ELEMENTS, Site } from './config';
import { getSiteName } from '@src/utils/site';
import SearchSiteContent from './SearchSiteContent';
import LangProvider from '../shared/provider/LangProvider';

refreshOnUpdate('pages/content');

const createSidebarContainer = (siteName: Site) => {
  let sidebarContainer = document.querySelector(ELEMENTS[siteName].SIDEBAR_CONTAINER.selector);

  if (sidebarContainer !== null) {
    return sidebarContainer;
  }

  const targetContainer = document.querySelector(ELEMENTS[siteName].TARGET_CONTAINER.selector);

  sidebarContainer = document.createElement('div');
  sidebarContainer.id = ELEMENTS[siteName].SIDEBAR_CONTAINER.id;

  targetContainer.appendChild(sidebarContainer);

  return sidebarContainer;
};

const createContentRoot = (siteName: Site) => {
  const contentRoot = document.createElement('div');
  contentRoot.id = ELEMENTS[siteName].CONTENT_ROOT.id;

  return contentRoot;
};

const render = () => {
  const siteName = getSiteName();

  const sidebarContainer = createSidebarContainer(siteName);
  const root = createContentRoot(siteName);

  sidebarContainer.prepend(root);

  createRoot(root).render(
    <LangProvider>
      <SearchSiteContent />
    </LangProvider>,
  );
};

const SEARCH_SITES = ['google', 'daum', 'naver'] as const;

if (window.location.hostname.match(SEARCH_SITES.join('|'))?.[0]) {
  render();
}
