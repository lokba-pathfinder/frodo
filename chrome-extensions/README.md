# Pinnect.ai: Easy, Fast, and Authentic

팀 프로도에서는 Pinnect.ai의 모든 기능을 크롬 익스텐션에서 사용할 수 있도록 제공합니다. [크롬 웹 스토어](https://chrome.google.com/webstore/detail/pinnectai-easy-fast-and-a/dgehmmodngcdaiaoomenancidjnnfpac)에서 지금 바로 시작하세요.

## 사용 방법

### 컨텍스트 검색

텍스트를 드래그하고, 즉시 Pinnect.ai의 검색 결과를 받아보세요.

![contextMenu](https://github.com/brain-pathfinder/frodo/assets/137984410/e5e09f16-8354-4557-97ee-d8fc02c0052f)

### 사이트 검색

Google, Daum, Naver 등 주요 검색 사이트에서 Pinnect.ai의 검색 결과를 함께 받아보세요.

![google](https://github.com/brain-pathfinder/frodo/assets/137984410/4320ada3-69ba-434b-a3b3-19a07f8c33a2)

### Youtube 영상

Youtube 영상을 시청하면서 전체 스크립트와 요약 스크립트를 함께 받아보세요.

![summaryscript](https://github.com/brain-pathfinder/frodo/assets/137984410/d1799ab5-fe11-4268-b980-3c625b5e0047)

## 기술 스택

- 언어 : `typescript`
- 프레임워크 : `react`
- 빌드 도구 : `vite`
- css : `sass`

## 권한 및 환경 설정

익스텐션에서 사용한 권한은 `manifest.ts` 파일에서 볼 수 있어요.

```ts
permissions: ['contextMenus', 'tabs', 'storage'];
```

- `contextMenus` : 마우스 오른쪽 클릭을 통해 컨텍스트 메뉴를 열어, 선택한 텍스트를 Pinnect.ai로 바로 요청을 보낼 수 있는 기능을 사용할 수 있어요.
- `tabs` : 컨텍스트 메뉴에서 Pinnect.ai에서 컨텍스트 메뉴를 클릭할 때, 새 탭에서 Pinnect.ai 웹사이트 검색 결과를 보여줄 수 있어요.
- `storage`
  1. 사용자의 언어 표시 선호도를 저장하기 위해 필요해요.
  2. 임베딩 요청 시 사용자 식별을 위한 무작위 값을 저장하기 위해 필요해요.

추가로 API 요청을 위해 서버 URL을 등록해야 해요. **서버는 반드시 HTTPS 프로토콜을 사용해야 해요.**

```ts
host_permissions: [
  /*여기에 API 서버 주소를 적어주세요.*/
];
```

## 빌드 및 실행 방법

### 빌드

```bash
$ git clone https://github.com/brain-pathfinder/frodo.git

$ cd frodo/chrome-extensions

# Set ESM (ECMAScript Modules) support for PnP
$ yarn install

$ yarn build
```

- `/dist` 디렉토리 하위에 결과물이 생성되요.

### 개발자 모드 실행

```bash
$ git clone https://github.com/brain-pathfinder/frodo.git

$ cd frodo/chrome-extensions

# Set ESM (ECMAScript Modules) support for PnP
$ yarn install

$ yarn dev
```

- `/dist` 디렉토리 하위에 결과물이 생성되요.
- [크롬 확장 프로그램 URL](chrome://extensions/)로 이동해서 `압축해제된 확장 프로그램을 로드합니다` 를 클릭하고, 해당 결과물을 로드할 수 있어요.
- 소스 코드 수정 시 자동으로 새로고침 되지만, 설정 파일이나 권한, 그 외 등록되지 않은 파일을 수정했을 경우에는 별도의 빌드와 로드가 필요해요.
