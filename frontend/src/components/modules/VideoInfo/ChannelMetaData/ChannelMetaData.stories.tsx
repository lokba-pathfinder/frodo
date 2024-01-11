import ChannelMetaData from '.';
import { videoInfos } from '../../../../mocks/data/common';
import { vars } from '../../../../styles/themes.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'modules/VideoInfo/ChannelMetaData',
  component: ChannelMetaData,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: vars.colors.white }],
    },
  },
  argTypes: {},
} satisfies Meta<typeof ChannelMetaData>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    channelImageUrl: videoInfos[0].channelImageUrl,
    channelTitle: videoInfos[0].channelTitle,
  },
};
