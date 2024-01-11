import { style } from '@vanilla-extract/css';

export const titleWrapper = style({
  position: 'sticky',
  top: 0,
  left: 0,
  width: '100%',
  padding: '2rem 1.3rem',
  borderRadius: '8px',
  background: '#EFF2F8',
  marginTop: '0.8rem',
});

export const title = style({
  color: '#0E1F40',
  fontSize: '2rem',
  fontWeight: '500',
  lineHeight: 'normal',
});

export const descriptions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.3rem',
  padding: '1.6rem 0',
  listStylePosition: 'outside',
  paddingLeft: '2.4rem',
});

export const description = style({
  color: '#576473',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: 'normal',
  listStyleType: 'disc',
});
