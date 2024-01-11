import { vars } from '../../../styles/themes.css';
import { style } from '@vanilla-extract/css';

export const form = style({
  display: 'flex',
  alignItems: 'center',
  minWidth: 'fit-content',
  minHeight: 'fit-content',
  borderRadius: vars.radius.xl,
  backgroundColor: vars.colors.white,
});

// TODO : type="search" icon 삭제
export const input = style({
  flex: '10',
  padding: '0 2rem',
  border: 'none',
  borderRadius: `${vars.radius.sm} 0 0 ${vars.radius.sm}`,
});

export const button = style({
  flex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: `0 ${vars.radius.sm} ${vars.radius.sm} 0`,
  transition: 'background 0.2s',
});

// styles for SearchForm.stories.ts
export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const lgFormStyle = style({
  width: '90rem',
  height: '9rem',
  fontSize: '3.2rem',
});

export const mdFormStyle = style({
  width: '70rem',
  height: '7rem',
  fontSize: '2.4rem',
});

export const smFormStyle = style({
  width: '50rem',
  height: '5rem',
  fontSize: '1.6rem',
});
