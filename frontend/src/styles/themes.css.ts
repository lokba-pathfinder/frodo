import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  colors: {
    white: '#ffffff',
    gray_400: '#bbbbbb',
    gray_600: '#4b4f59',
    gray_700: '#40434b',
    gray_800: '#313338',
    gray_900: '#1e1f22',
    black: '#000000',
    yellow: '#f6c744',
    brown: '#bea253',
    red: '#ea3223',
  },
  fontSize: {
    xs: '1rem', // 10px
    sm: '1.2rem', // 12px
    md: '1.4rem', // 14px
    lg: '1.6rem', // 16px
    xl: '2rem', // 20px
    '2xl': '3rem', // 30px
    '3xl': '4rem', // 40px
    '4xl': '5rem', // 50px
    '5xl': '6rem', // 60px
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    rounded: '5000px',
  },
  zIndex: {
    script_header: '100',
    tooltip_text: '200',
  },
});
