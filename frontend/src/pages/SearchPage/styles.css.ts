import { style } from '@vanilla-extract/css';

export const left = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  height: '100%',
});

export const contents = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  padding: '0 12px 50px',
  overflowY: 'scroll',
});

export const videoInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const metaDataContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const link = style({
  ':hover': {
    textDecoration: 'underline',
  },
});

export const linkButton = style({
  position: 'absolute',
  right: 0,
  bottom: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '12rem',
  height: '4rem',
  background: '#8A9AAC',
  color: '#EDF0F3',
  borderRadius: '8px',
  fontSize: '1.6rem',
  fontWeight: 500,
  lineHeight: '1.6rem',
});

// 페이지 레이아웃이 깨지는 것을 방지하기 위한 컨테이너 스타일
export const storyContainer = style({
  height: '100vh',
});
