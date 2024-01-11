import { vars } from '../../../styles/themes.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({
  position: 'absolute',
  width: 'fit-content',
});

const base = style({
  position: 'absolute',
  maxWidth: '40rem',
  width: 'max-content',
  padding: '1rem 2rem',
  wordBreak: 'break-word',
  borderRadius: vars.radius.md,
  background: '#4B4F59',
  color: '#ffffff',
  fontSize: vars.fontSize.lg,
  fontWeight: '500',
  lineHeight: '1.4',
  userSelect: 'none',
  cursor: 'default',

  selectors: {
    [`${container}:hover &`]: {
      zIndex: vars.zIndex.tooltip_text,
    },
  },
});

export const tooltipText = styleVariants({
  default: [
    base,
    {
      display: 'none',
    },
  ],
  active: [
    base,
    {
      display: 'block',
    },
  ],
});

// style for Tooltip.stories.ts
export const storyContainer = style({
  width: 'fit-content',
  fontSize: vars.fontSize.xl,
  display: 'flex',
  flexDirection: 'column',
  gap: '10rem',
  alignItems: 'center',
});

export const storyButtonContainer = style({
  display: 'flex',
  gap: '2rem',
  marginTop: '15rem',
});

export const storyBaseButton = style({
  padding: '1rem 2rem',
  fontSize: vars.fontSize.xl,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.colors.white}`,
  cursor: 'pointer',

  ':hover': {
    background: vars.colors.gray_400,
  },
});

export const storyButton = styleVariants({
  default: [storyBaseButton],
  active: [
    storyBaseButton,
    {
      background: vars.colors.gray_400,
    },
  ],
});
