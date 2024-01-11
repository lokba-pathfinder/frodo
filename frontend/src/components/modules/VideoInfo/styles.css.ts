import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const metaDataContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

// storybook
export const storyContainer = style({
  background: '#F9FAFF',
  width: '1000px',
});
