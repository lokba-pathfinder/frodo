import { skeletonBase } from '../../../../styles/styles.css';
import { style } from '@vanilla-extract/css';

export const container = style([
  skeletonBase,
  {
    width: '100%',
  },
]);

export const item = style({
  width: '100%',
  height: 0,
  paddingTop: '56.25%',
});
