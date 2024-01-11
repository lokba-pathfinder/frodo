import { shakeAnimate } from '../../../../../styles/animate.css';
import { flexCentered } from '../../../../../styles/utils.css';
import { style } from '@vanilla-extract/css';

export const backgroundContainer = style([
  flexCentered,
  {
    flexDirection: 'column',
    width: '80%',
    height: '100%',
    margin: '0 auto',
    backgroundImage: 'url("/src/assets/blob-spot.png")',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
]);

export const enlargeImage = style({
  height: '50%',
  maxHeight: '25rem',
  objectFit: 'contain',
  animation: `${shakeAnimate} 8s infinite cubic-bezier(0.25, 0.1, 0.25, 1)`,
});

export const title = style({
  fontSize: '3.6rem',
  fontWeight: 700,
  color: '#0E1F40',
  marginBottom: '2.4rem',
});

export const tipBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '500px',
  padding: '20px',
  borderRadius: '15px',
  background: '#FCEAFF',
  color: 'black',
});

export const tips = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '7px',
  paddingLeft: '15px',
  listStylePosition: 'outside',
});

export const tip = style({
  listStyleType: 'disc',
  lineHeight: '1.4',
  fontSize: '1.8rem',
  wordBreak: 'break-word',
});
