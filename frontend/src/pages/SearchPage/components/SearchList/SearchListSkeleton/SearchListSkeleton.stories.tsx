import SearchListSkeleton from '.';
import { vars } from '../../../../../styles/themes.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchListSkeleton> = {
  title: 'pages/SearchPage/SearchList/SearchListSkeleton',
  component: SearchListSkeleton,
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

type Story = StoryObj<typeof SearchListSkeleton>;

export const Default: Story = {
  args: { itemCount: 10 },
};
