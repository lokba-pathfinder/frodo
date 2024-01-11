import { skeletonBase } from '../../../../../styles/styles.css';
import { vars } from '../../../../../styles/themes.css';
import { style } from '@vanilla-extract/css';

const fontBase = style({
  fontFamily: 'Inter',
  fontSize: '14px',
  lineHeight: 'normal',
});

export const header = style({
  position: 'sticky',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  background: '#879AAE',
  padding: '0 1.2rem',
  width: '100%',
  height: '4.1rem',
  zIndex: vars.zIndex.script_header,
});

export const head = style([
  fontBase,
  {
    color: '#DFE4EA',
    fontWeight: 700,
  },
]);

export const fullScript = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1.2rem',
  padding: '0.8rem 1.2rem',
  background: '#F9FAFF',
});

export const startTime = style([
  skeletonBase,
  {
    width: '4.5rem',
    height: '1.4rem',
    background: '#E2F0FD',
    borderRadius: '4px',
    padding: '0 4px',
    border: 'none',
  },
]);

export const contents = style({
  width: '100%',
  display: 'flex',
  gap: '5px',
  flexDirection: 'column',
});

export const content = style([
  skeletonBase,
  {
    width: '80%',
    height: '1.4rem',
  },
]);

// styles for stories
export const storyContainer = style({
  width: '1000px',
});
