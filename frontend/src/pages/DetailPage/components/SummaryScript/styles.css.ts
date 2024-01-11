import { globalStyle, style } from '@vanilla-extract/css';

const fontBase = style({
  fontFamily: 'Inter',
  fontWeight: 500,
  lineHeight: 'normal',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '2.4rem 1.6rem',
  background: '#F9FAFF',
});

export const highlighted = style({
  background: '#EFF2F8',
});

export const header = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.8rem',
  marginBottom: '2.8rem',
});

export const icon = style({
  width: '20px',
  height: '20px',
  marginTop: '4px',
  color: '#0E1F40',

  ':hover': {
    cursor: 'pointer',
  },
});

export const head = style([
  fontBase,
  {
    color: '#0E1F40',
    fontSize: '24px',

    ':hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
    },
  },
]);

globalStyle(`${icon}:hover ~ ${head}`, {
  textDecoration: 'underline',
  textUnderlineOffset: '4px',
});

export const unorderedList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  marginLeft: '3.2rem',
});

export const listItem = style([
  fontBase,
  {
    fontSize: '16px',
    color: '#576473',
    lineHeight: '22px',
    listStyleType: 'disc',
  },
]);
