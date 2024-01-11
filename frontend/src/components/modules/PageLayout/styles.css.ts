import { style } from '@vanilla-extract/css';

export const layout = style({
  maxWidth: '1280px',
  height: '100%',
  margin: '0 auto',
  background: '#F9FAFF',
});

export const formStyle = style({
  width: '57rem',
  height: '4rem',
  fontSize: '1.4rem',
  boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
  borderRadius: '4px',
});

export const main = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '3.6rem',
  height: 'calc(100% - 8rem)',
  margin: '0 1.5rem',
});

export const left = style({
  flex: 1,
  maxWidth: '75.6rem',
  minWidth: '45.6rem',
});

export const right = style({
  flexShrink: 0,
  width: '45.6rem',
});
