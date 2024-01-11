import { skeletonBase } from '../../../../../styles/styles.css';
import { style } from '@vanilla-extract/css';

export const titleWrapper = style({
  width: '100%',
  padding: '2rem 1.3rem',
  borderRadius: '8px',
  background: '#EFF2F8',
  marginTop: '0.8rem',
});

export const title = style([
  skeletonBase,
  {
    width: '40%',
    height: '2rem',
  },
]);

export const descriptions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.3rem',
  padding: '1.6rem 0 1.6rem 2.4rem',
});

export const description = style([
  skeletonBase,
  {
    width: '80%',
    height: '1.4rem',
  },
]);

// storybook
export const storyContainer = style({
  width: '1000px',
});
