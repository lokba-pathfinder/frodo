import SimilarityScriptSkeleton from '.';
import { storyContainer } from './styles.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SimilarityScriptSkeleton> = {
  title: 'pages/SearchPage/SimilarityScript/SimilarityScriptSkeleton',
  component: SimilarityScriptSkeleton,
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

type Story = StoryObj<typeof SimilarityScriptSkeleton>;

export const Default: Story = {
  args: {},
};
