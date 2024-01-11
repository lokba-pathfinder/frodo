import { shakeAnimate } from '../../styles/animate.css';
import { flexCentered } from '../../styles/utils.css';
import { style } from '@vanilla-extract/css';

export const layout = style({
  width: '100%',
  height: '100%',
  margin: '0 auto',
  background: '#F9FAFF',
});

export const main = style([
  flexCentered,
  {
    height: 'calc(100% - 8rem)',
  },
]);

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  width: '80rem',
  height: '100%',
});

export const backgroundContainer = style([
  flexCentered,
  {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundImage: 'url("/src/assets/wavy-spot.png")',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
]);

export const trashImage = style({
  height: '50%',
  maxHeight: '25rem',
  objectFit: 'contain',
  animation: `${shakeAnimate} 8s infinite cubic-bezier(0.25, 0.1, 0.25, 1)`,

  '@media': {
    // 디자인이 깨지는 경우를 간단하게 처리했어요.
    '(max-height: 545px)': {
      display: 'none',
    },
  },
});

export const title = style({
  fontSize: '3.6rem',
  fontWeight: 700,
  color: '#0E1F40',
  marginBottom: '2.4rem',
});

export const description = style({
  fontSize: '1.5rem',
  fontWeight: 500,
  color: '#576473',
  whiteSpace: 'pre-line',
  textAlign: 'center',
  marginBottom: '4.8rem',
});

export const formStyle = style({
  width: '57rem',
  height: '4rem',
  fontSize: '1.4rem',
  border: '1px solid #000000',
  borderRadius: '4px',
});

export const link = style([
  flexCentered,
  {
    width: '23rem',
    height: '5rem',
    background: '#8A9AAC',
    color: '#EDF0F3',
    borderRadius: '8px',
    fontSize: '1.8rem',
    fontWeight: 500,
    lineHeight: '1.6rem',
  },
]);

// 페이지 레이아웃이 깨지는 것을 방지하기 위한 컨테이너 스타일
export const storyContainer = style({
  height: '100vh',
});
