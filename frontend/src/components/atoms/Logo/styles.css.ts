import { style } from '@vanilla-extract/css';

export const logoIcon = style({
  width: '40px',
  height: '40px',
  userSelect: 'none',
  transition: 'scale 0.3s',

  ':hover': {
    scale: 1.1,
  },
  ':active': {
    scale: 1.05,
  },
});
