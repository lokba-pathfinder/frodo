import { vars } from '../../../styles/themes.css';
import { style } from '@vanilla-extract/css';

export const progressiveBar = style({
  position: 'relative',
  width: '100%',
  height: '1rem',
  // Mark(Sean.pf): 투명도가 적용되는 색상을 globalTheme로 이동해도 좋을 것 같아요.
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

export const progressBar = style({
  width: '0', // 너비는 컴포넌트에서 inline으로 추가
  height: '100%', // 높이는 항상 부모 컨테이너의 높이만큼 차지
  background: vars.colors.red,
});
