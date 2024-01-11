import { style } from '@vanilla-extract/css';

export const flexCentered = style({
  display: 'flex',
  alignItems: 'center', // 수직 중앙 정렬
  justifyContent: 'center', // 수평 중앙 정렬
});
