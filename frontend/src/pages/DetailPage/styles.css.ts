import { style, styleVariants } from '@vanilla-extract/css';

export const contentsContainerBase = style({
  height: '100%',
  overflow: 'hidden',
});

export const contentsContainer = styleVariants({
  left: [
    contentsContainerBase,
    {
      display: 'flex',
      flexDirection: 'column',
      gap: '2.4rem',
    },
  ],
  right: [
    contentsContainerBase,
    {
      height: '100%',
      overflow: 'scroll',
    },
  ],
});

export const leftContents = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  height: '100%',
  overflow: 'scroll',
});

// 스토리북에서 컨테이너(storybook-root) 높이가 지정되지 않아서
// 페이지 레이아웃이 깨지는 것을 방지하기 위한 컨테이너 스타일
export const storyContainer = style({
  height: '100vh',
});
