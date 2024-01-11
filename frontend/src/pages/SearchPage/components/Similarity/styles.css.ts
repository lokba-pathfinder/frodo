import { style, styleVariants } from '@vanilla-extract/css';

export const similarity = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const circleBase = style({
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: '50%',
});

export const circle = styleVariants({
  high: [
    circleBase,
    {
      background: '#4DA563',
    },
  ],
  medium: [
    circleBase,
    {
      background: '#C6DC5C',
    },
  ],
  low: [
    circleBase,
    {
      background: '#FFBB02',
    },
  ],
});

export const text = style({
  color: '#576473',
  fontSize: '1.2rem',
  fontWeight: '400',
  lineHeight: 'normal',
});

export const threshold = style({
  fontSize: '1rem',
});
