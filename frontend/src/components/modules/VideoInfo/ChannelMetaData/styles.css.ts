import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
});

export const img = style({
  width: '4rem',
  height: '4rem',
  borderRadius: '50%',
});

export const channelTitle = style({
  fontFamily: 'Inter',
  color: '#0E1F40',
  fontSize: '2rem',
  fontWeight: 500,
});
