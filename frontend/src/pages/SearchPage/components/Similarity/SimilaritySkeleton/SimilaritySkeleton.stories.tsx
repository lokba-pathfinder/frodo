import SimilaritySkeleton from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SimilaritySkeleton> = {
  title: 'pages/SearchPage/Similarity/SimilaritySkeleton',
  component: SimilaritySkeleton,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof SimilaritySkeleton>;

export const Default: Story = {
  args: {},
};
