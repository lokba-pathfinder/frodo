import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('html', {
  width: '100vw',
  height: '100vh',
  fontSize: '62.5%',
  background: '#F9FAFF',
  lineHeight: 1,
});

globalStyle('#root', {
  width: '100vw',
  height: '100vh',
});

globalStyle('li', {
  listStyle: 'none',
});

globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
});
