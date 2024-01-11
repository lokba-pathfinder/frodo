/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { ELEMENTS, Site } from '@src/pages/content/SearchSiteContent/config';

export const getSiteName = () => {
  const siteRegex = new RegExp(Object.keys(ELEMENTS).join('|'));
  const siteName = window.location.hostname.match(siteRegex)![0];

  return siteName as Site;
};
