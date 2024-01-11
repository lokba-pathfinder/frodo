import { skeletonBase } from '../../../../../styles/styles.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  width: '45.6rem',
  height: '100%',
  padding: '1.6rem',
  border: '1px solid #E5E5E5',
  borderRadius: '16px',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const title = style([
  skeletonBase,
  {
    width: '12rem',
    height: '2rem',
  },
]);

export const description = style([
  skeletonBase,
  {
    width: '9rem',
    height: '1.2rem',
  },
]);

export const searchList = style({
  height: '100%',
  overflowY: 'scroll',
});
