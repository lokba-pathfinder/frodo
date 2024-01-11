import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  gap: '10px',
  width: '100%',
  height: '12.7rem',
  padding: '1.6rem',
  borderRadius: '16px',
  cursor: 'pointer',

  ':hover': {
    background: '#F2F2F2',
  },
});

export const highlighted = style({
  background: '#E9E9E9',

  ':hover': {
    background: '#E9E9E9',
  },
});

export const thumbnail = style({
  width: '17rem',
  height: '9.5rem',
  borderRadius: '8px',
  objectFit: 'cover',
});

export const contents = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '9.5rem',
});

export const title = style({
  color: '#455261',
  fontSize: '14px',
  fontWeight: '700',
  lineHeight: 'normal',
  // 2줄 ellipsis 적용
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

export const channelMetaData = style({
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
});

export const channelThumbnail = style({
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
});

export const channelTitle = style({
  color: '#606060',
  fontSize: '12px',
  fontWeight: '400',
});

export const videoMetaData = style({
  color: '#606060',
  fontSize: '12px',
  fontWeight: '400',
});

// styles for SearchItem.story
export const storyContainer = style({
  width: '456px',
});
