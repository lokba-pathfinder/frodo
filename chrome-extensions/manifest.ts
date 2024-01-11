import packageJson from './package.json';

const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: 'Pinnect.ai: Easy, Fast, and Authentic',
  version: packageJson.version,
  description: packageJson.description,
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  action: {
    default_icon: 'icon-32.png',
  },
  icons: {
    '128': 'icon-128.png',
  },
  content_scripts: [
    {
      matches: [
        'https://www.google.com/search*',
        'https://search.naver.com/search*',
        'https://search.daum.net/*',
        'https://www.youtube.com/*',
      ],
      js: ['src/pages/content/index.js'],
      // KEY for cache invalidation
      css: ['assets/css/contentStyle<KEY>.chunk.css'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['assets/js/*.js', 'assets/css/*.css', 'icon-128.png'],
      matches: ['*://*/*'],
    },
  ],
  permissions: ['contextMenus', 'tabs', 'storage'],
  host_permissions: ['https://www.pinnect-ai.com/api/*'],
};

export default manifest;
