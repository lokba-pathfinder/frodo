import { vars } from '../../../styles/themes.css';
import { style } from '@vanilla-extract/css';

export const input = style({
  height: '100%',
  border: `1px solid ${vars.colors.gray_600}`,
  borderRadius: vars.radius.sm,
  color: vars.colors.black,
  backgroundColor: vars.colors.white,
  fontSize: 'inherit',
  '::placeholder': {
    color: vars.colors.gray_400,
  },
  ':focus': {
    outline: 'none',
  },
});

// style for Input.stories.ts
export const baseStyle = style({
  width: '50rem',
  height: '5rem',
  padding: '0 1.5rem',
  fontSize: '1.8rem',
});
