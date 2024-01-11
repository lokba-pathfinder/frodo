import FullScriptsSkeleton from '.';
import { storyContainer } from './styles.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'pages/DetailPage/FullScripts/FullScriptsSkeleton',
  component: FullScriptsSkeleton,
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
} satisfies Meta<typeof FullScriptsSkeleton>;

export default meta;

type Story = StoryObj<typeof FullScriptsSkeleton>;

export const Default: Story = {
  args: {},
};
