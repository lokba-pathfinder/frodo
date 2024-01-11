import { vars } from '../../../../../styles/themes.css';
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
    zIndex: vars.zIndex.script_header,
  },
]);

export const head = style([
  fontBase,
  {
    color: '#DFE4EA',
    fontWeight: 700,
  },
]);

// styles for stories
export const storyContainer = style({
  width: '500px',
});
