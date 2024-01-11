import { flexCentered } from '../../../../../styles/utils.css';
import { style } from '@vanilla-extract/css';

export const container = style([
  flexCentered,
  {
    height: '100%',
  },
]);

export const description = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '2.4rem',
  fontWeight: '700',
  lineHeight: '1.5',
  wordBreak: 'break-word',
});

export const em = style({
  fontWeight: 700,
  color: '#AE70F1',
});
