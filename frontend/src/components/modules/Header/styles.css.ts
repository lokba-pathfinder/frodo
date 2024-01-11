import { vars } from '../../../styles/themes.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '8rem',
  padding: '0 2rem',
});

export const left = style({
  flex: 1,
  height: '40px',
});

export const link = style({
  display: 'inline-block',
});

export const center = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
});

export const right = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'right',
  gap: '1.6rem',
  color: vars.colors.white,
  fontSize: '2rem',
});

export const menu = style({
  width: '40px',
  height: '40px',
  background: '#ffffff',
  boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'scale 0.3s',

  // scale transition 시 임의로 z-index가 0이 됨
  zIndex: 300,

  ':hover': {
    scale: 1.05,
  },
  ':active': {
    scale: 0.95,
    background: '#F2F2F2',
  },
});

export const tooltip = style({
  padding: '1rem',
  fontSize: '1.2rem',
});

export const iconBox = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  transition: 'scale 0.3s',

  selectors: {
    [`${menu}:hover &`]: {
      scale: 1.05,
    },
  },
});

export const icon = style({
  width: '24px',
  height: '24px',
  userSelect: 'none',
});

// styles for Header.stories
export const formStyle = style({
  width: '57rem',
  height: '4rem',
  fontSize: '1.4rem',
  border: '1px solid #000000',
  borderRadius: '4px !important',
});
