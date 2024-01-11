import RetryErrorFallback from '.';
import { storyFullScreenContainer } from '../../../../styles/styles.css';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RetryErrorFallback> = {
  title: 'atoms/RetryErrorFallback',
  component: RetryErrorFallback,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className={storyFullScreenContainer}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { statusCode: 404, onClick: () => {} },
};
