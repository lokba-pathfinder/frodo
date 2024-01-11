import { skeletonAnimate } from './animate.css';
import { vars } from './themes.css';
import { flexCentered } from './utils.css';
import { style } from '@vanilla-extract/css';

export const storyFullScreenContainer = style([
  flexCentered,
  {
    width: '100vw',
    height: '100vh',
  },
]);

export const skeletonBase = style({
  backgroundColor: '#9BAEC2',
  borderRadius: vars.radius.md,
  animation: skeletonAnimate,
});
