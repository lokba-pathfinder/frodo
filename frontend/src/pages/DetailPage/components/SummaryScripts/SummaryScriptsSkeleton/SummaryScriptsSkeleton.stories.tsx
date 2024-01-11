import SummaryScriptsSkeleton from '.';
import { storyContainer } from './styles.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'pages/DetailPage/SummaryScripts/SummaryScriptsSkeleton',
  component: SummaryScriptsSkeleton,
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
} satisfies Meta<typeof SummaryScriptsSkeleton>;

export default meta;

type Story = StoryObj<typeof SummaryScriptsSkeleton>;

export const Default: Story = {
  args: {},
};
