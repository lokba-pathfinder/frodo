import { skeletonBase } from '../../../../../styles/styles.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  gap: '10px',
  width: '100%',
  height: '12.7rem',
  padding: '1.6rem',
  borderRadius: '16px',
});

export const thumbnail = style([
  skeletonBase,
  {
    width: '17rem',
    height: '9.5rem',
    borderRadius: '16px',
  },
]);

export const contents = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '9.5rem',
});

export const title = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
});

export const line = style([
  skeletonBase,
  {
    width: '20rem',
    height: '1.4rem',
  },
]);

export const channelMetaData = style({
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
});

export const channelThumbnail = style([
  skeletonBase,
  {
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
  },
]);

export const channelTitle = style([
  skeletonBase,
  {
    width: '5rem',
    height: '1.4rem',
  },
]);

export const videoMetaData = style([
  skeletonBase,
  {
    width: '14rem',
    height: '1.4rem',
  },
]);
