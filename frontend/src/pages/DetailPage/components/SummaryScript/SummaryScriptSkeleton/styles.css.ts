import { skeletonBase } from '../../../../../styles/styles.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '2.4rem 1.6rem',
  background: '#F9FAFF',
});

export const header = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.8rem',
  marginBottom: '2.8rem',
});

export const icon = style({
  width: '20px',
  height: '20px',
  marginTop: '4px',
  color: '#0E1F40',
});

export const head = style([
  skeletonBase,
  {
    width: '60%',
    height: '2.4rem',
  },
]);

export const unorderedList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  marginLeft: '3.2rem',
});

export const listItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
});

export const line = style([
  skeletonBase,
  {
    width: '100%',
    height: '1.6rem',
  },
]);

// styles for stories
export const storyContainer = style({
  width: '500px',
});
