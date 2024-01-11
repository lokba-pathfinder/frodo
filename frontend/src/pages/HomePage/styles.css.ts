import { vars } from '../../styles/themes.css';
import { flexCentered } from '../../styles/utils.css';
import { style, styleVariants } from '@vanilla-extract/css';

const emBase = style({
  fontFamily: 'Inter',
  fontStyle: 'normal',
});

export const layout = style({
  width: '100%',
  height: '100%',
  margin: '0 auto',
  background: '#F9FAFF',
});

export const main = style([
  flexCentered,
  {
    height: 'calc(100% - 8rem)',
  },
]);

export const wrapper = style({
  width: '120rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  marginBottom: '20rem',
});

export const title = style({
  fontSize: '5rem',
  fontWeight: '300',
  color: '#0E1F40',
  lineHeight: '1.2',
});

export const em = styleVariants({
  normal: [emBase],
  highlighted: [
    emBase,
    {
      fontWeight: '600',
      fontStyle: 'normal',
    },
  ],
});

export const formStyle = style({
  height: '9rem',
  fontSize: vars.fontSize['2xl'],
  border: '1px solid #576473',
  borderRadius: '4px',
});

export const list = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1.7rem',
});

export const keyword = style({
  color: '#576473',
  borderColor: '#576473',
  transition: 'color, background, scale 0.3s',

  ':hover': {
    background: '#879AAE',
    color: '#DFE4EA',
  },
  ':active': {
    background: '#879AAE',
    color: '#DFE4EA',
    scale: 0.99,
  },
});

export const storyContainer = style({
  height: '100vh',
});
