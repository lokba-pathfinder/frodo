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

export const title = style({
  color: '#0E1F40',
  fontSize: '20px',
  fontWeight: '500',
  lineHeight: 'normal',
});

export const description = style({
  color: '#606060',
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: 'normal',
});

export const searchList = style({
  height: '100%',
  overflowY: 'scroll',
});
