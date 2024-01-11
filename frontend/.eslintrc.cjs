/* eslint-env node */

module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'eslint-config-prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:storybook/recommended',
    'plugin:prettier/recommended', // 충돌 방지를 위해 prettier는 아래쪽에 위치
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    // 하나의 파일 - 하나의 컴포넌트 내보내기(단, 상수(string, number, boolean, template literal)는 예외)
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
      },
    ],
    // 화살표 함수 본문 주위에 중괄호 필요
    'arrow-body-style': ['error', 'as-needed'],
    // 확장자 없이 import 가능
    'import/extensions': 'off',
    // 컴포넌트(named, unnamed) 모두 화살표 함수로 정의
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // React 17 이상 버전에는 JSX 사용 시 import React 필요 X
    'react/react-in-jsx-scope': 'off',
    // spread 연산자를 props로 사용할 수 있게 변경
    'react/jsx-props-no-spreading': 'off',
    // default props를 강제하지 않음
    'react/require-default-props': 'off',
    // non-null 단언 연산자 사용 시 에러
    '@typescript-eslint/no-non-null-assertion': 'error',
    // 파일을 export할 때 default export가 있는지 여부를 확인합니다.(0: "off", 1: "warn"),
    'import/prefer-default-export': 0,
    'import/order': 'off',
    // void 연산자 사용 시 error를 비활성화
    'no-void': 'off',
    // element에 마우스 이벤트 등록 시 키보드 이벤트 강제 규칙 비활성화
    'jsx-a11y/click-events-have-key-events': 'off',
    // non-interactive 요소에 대한 role 명시 규칙 비활성화
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
  },
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts'],
};
