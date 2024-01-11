import { skeletonBase } from '../../../../../styles/styles.css';
import { style } from '@vanilla-extract/css';

export const similarity = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const circle = style([
  skeletonBase,
  {
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%',
  },
]);

export const text = style([
  skeletonBase,
  {
    width: '9rem',
    height: '1.2rem',
  },
]);
