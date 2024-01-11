import { keyframes } from '@vanilla-extract/css';

export const pulseAnimate = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.7 },
  '100%': { opacity: 1 },
});

export const skeletonAnimate = `${pulseAnimate} 2s infinite`;

export const shakeAnimate = keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '10%, 90%': { transform: 'translateY(-4px)' },
  '20%, 80%': { transform: 'translateY(0)' },
  '30%, 70%': { transform: 'translateY(-4px)' },
  '40%, 60%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(1px)' },
});
