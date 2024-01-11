import { vars } from '../../../styles/themes.css';
import { flexCentered } from '../../../styles/utils.css';
import { style } from '@vanilla-extract/css';

export const container = style([
  flexCentered,
  {
    position: 'relative',
    backgroundColor: 'transparent',
  },
]);

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: `${vars.radius.md} ${vars.radius.md} 0 0`,
});

export const progressiveBar = style({
  position: 'absolute',
  bottom: '0',
  left: '0',
  height: '3%', // container의 3% 높이
});
