import VideoMetaData from '.';
import { videoInfos } from '../../../../mocks/data/common';
import { vars } from '../../../../styles/themes.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'modules/VideoInfo/VideoMetaData',
  component: VideoMetaData,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: vars.colors.white }],
    },
  },
  argTypes: {},
} satisfies Meta<typeof VideoMetaData>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { viewCount: videoInfos[0].viewCount, publishedAt: videoInfos[0].publishedAt },
};
