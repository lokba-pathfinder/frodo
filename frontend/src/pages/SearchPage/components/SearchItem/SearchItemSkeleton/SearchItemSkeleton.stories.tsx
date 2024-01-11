import SearchItemSkeleton from '.';
import { vars } from '../../../../../styles/themes.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchItemSkeleton> = {
  title: 'pages/SearchPage/SearchItem/SearchItemSkeleton',
  component: SearchItemSkeleton,
  argTypes: {},
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: vars.colors.white }],
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchItemSkeleton>;

export const Default: Story = {
  args: {},
};
