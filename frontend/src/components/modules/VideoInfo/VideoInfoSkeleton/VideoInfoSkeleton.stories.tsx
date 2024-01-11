import VideoInfoSkeleton from '.';
import { storyContainer } from './styles.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof VideoInfoSkeleton> = {
  title: 'modules/VideoInfo/VideoInfoSkeleton',
  component: VideoInfoSkeleton,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className={storyContainer}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof VideoInfoSkeleton>;

export const Default: Story = {
  args: {},
};
