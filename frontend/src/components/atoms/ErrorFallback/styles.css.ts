import { vars } from '../../../styles/themes.css';
import { flexCentered } from '../../../styles/utils.css';
import { style } from '@vanilla-extract/css';

export const container = style([
  flexCentered,
  {
    flexDirection: 'column',
    gap: '2rem',
    width: '100%',
    height: '100%',
    minHeight: '20rem',
    background: 'white',
    border: '1px solid #E5E5E5',
    borderRadius: '10px',
  },
]);

export const h2 = style({
  fontSize: vars.fontSize['2xl'],
  color: '#0E1F40',
  fontWeight: 700,
});

export const contents = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5px',
});

export const description = style({
  fontSize: vars.fontSize.lg,
  color: '#576473',
  fontWeight: 400,
});

export const button = style({
  padding: '0.8rem 1.6rem',
  border: 'none',
  borderRadius: vars.radius.md,
  backgroundColor: '#8A9AAC',
  color: '#EDF0F3',
  fontSize: vars.fontSize.lg,
  fontWeight: 'bold',
  lineHeight: '2rem',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',

  ':hover': {
    transform: 'scale(1.05)',
  },
});
