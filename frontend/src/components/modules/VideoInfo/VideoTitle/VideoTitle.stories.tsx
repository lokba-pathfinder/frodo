import VideoTitle from '.';
import { videoInfos } from '../../../../mocks/data/common';
import { vars } from '../../../../styles/themes.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'modules/VideoInfo/VideoTitle',
  component: VideoTitle,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: vars.colors.white }],
    },
  },
  argTypes: {},
} satisfies Meta<typeof VideoTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: videoInfos[0].title,
  },
};
