import SummaryScriptSkeleton from '.';
import { storyContainer } from './styles.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'pages/DetailPage/SummaryScript/SummaryScriptSkeleton',
  component: SummaryScriptSkeleton,
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
} satisfies Meta<typeof SummaryScriptSkeleton>;

export default meta;

type Story = StoryObj<typeof SummaryScriptSkeleton>;

export const Default: Story = {
  args: {},
};
