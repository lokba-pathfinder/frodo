import { vars } from '../../../../styles/themes.css';
import { style } from '@vanilla-extract/css';

export const keyword = style({
  padding: '1rem 2rem',
  border: `1px solid ${vars.colors.white}`,
  borderRadius: vars.radius.md,
  background: 'transparent',
  color: vars.colors.white,
  fontSize: vars.fontSize.xl,
  cursor: 'pointer',

  ':hover': {
    background: 'rgba(255, 255, 255, 0.2)',
  },
});
