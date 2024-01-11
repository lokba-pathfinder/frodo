import { vars } from '../../../styles/themes.css';
import { style } from '@vanilla-extract/css';

// 가로 크기 100%의 래퍼
export const container = style({
  position: 'relative',
  width: '100%',
});

// container 가로 크기 기준 16:9 사이즈의 래퍼
export const wrapper = style({
  position: 'relative',
  paddingBottom: '56.25%',
  height: 0,
  overflow: 'hidden',
  borderRadius: vars.radius.md,
});

// 유튜브 iframe 크기 스타일
export const video = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

// styles for story
export const storyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const storyButtonContainer = style({
  marginTop: '16px',
});

export const storyButton = style({
  padding: '8px 16px',
  margin: '8px',
  backgroundColor: vars.colors.yellow,
  color: vars.colors.black,
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});
