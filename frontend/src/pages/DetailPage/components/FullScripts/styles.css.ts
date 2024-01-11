import { style } from '@vanilla-extract/css';

const fontBase = style({
  fontFamily: 'Inter',
  fontSize: '14px',
  lineHeight: 'normal',
});

export const header = style([
  fontBase,
  {
    position: 'sticky',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    background: '#879AAE',
    padding: '0 1.2rem',
    width: '100%',
    height: '4.1rem',
  },
]);

export const head = style([
  fontBase,
  {
    color: '#DFE4EA',
    fontWeight: 700,
  },
]);

export const options = style({
  flex: '1',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: 'fit-content',
});

export const icon = style({
  fontSize: '16px',
  color: '#DFE4EA',

  ':hover': {
    color: '#DFE4EA',
    backgroundColor: 'inherit',
  },
});

export const fullScript = style([
  fontBase,
  {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.2rem',
    padding: '0.8rem 1.2rem',
    background: '#F9FAFF',

    ':hover': {
      background: '#F2F2F2',
      cursor: 'pointer',
    },
  },
]);

export const highlighted = style({
  background: '#E9E9E9',

  ':hover': {
    background: '#E9E9E9',
  },
});

export const startTime = style([
  fontBase,
  {
    color: '#2860CD',
    fontWeight: 500,
    background: '#E2F0FD',
    borderRadius: '4px',
    padding: '0 4px',
    border: 'none',
  },
]);

export const contents = style([
  fontBase,
  {
    color: '#576473',
    fontWeight: 500,
  },
]);
