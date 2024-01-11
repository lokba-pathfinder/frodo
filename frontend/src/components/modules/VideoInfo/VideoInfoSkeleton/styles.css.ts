import { skeletonBase } from '../../../../styles/styles.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const metaDataContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const channelMetaData = style({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
});

export const img = style([
  skeletonBase,
  {
    width: '4rem',
    height: '4rem',
    borderRadius: '50%',
  },
]);

export const channelTitle = style([
  skeletonBase,
  {
    width: '10rem',
    height: '2rem',
  },
]);

export const videoMetaData = style([
  skeletonBase,
  {
    marginTop: 'auto',
    width: '14rem',
    height: '1.2rem',
    fontSize: '1.2rem',
  },
]);

export const head = style([
  skeletonBase,
  {
    height: '2.4rem',
    width: '30rem',
  },
]);

// storybook
export const storyContainer = style({
  background: '#F9FAFF',
  width: '1000px',
});
