import { vars } from '../../../styles/themes.css';
import { style } from '@vanilla-extract/css';

export const button = style({
  display: 'flex',
  height: '100%',
  padding: '0.5rem',
  border: 'none',
  borderRadius: vars.radius.sm,
  background: 'transparent',
  color: vars.colors.gray_400,
  fontSize: 'inherit',
  cursor: 'pointer',

  ':hover': {
    color: '#455261',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    scale: 1.05,
  },
});

// style for IconButton.stories.ts
export const container = style({
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
});

export const xlStyle = style({
  fontSize: '6rem',
});

export const lgStyle = style({
  fontSize: '5rem',
});

export const mdStyle = style({
  fontSize: '4rem',
});

export const smStyle = style({
  fontSize: '3rem',
});

export const xsStyle = style({
  fontSize: '2rem',
});
