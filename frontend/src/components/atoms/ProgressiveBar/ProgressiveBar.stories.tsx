import ProgressiveBar from '.';
import { vars } from '../../../styles/themes.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProgressiveBar> = {
  title: 'atoms/ProgressiveBar',
  component: ProgressiveBar,
  argTypes: {
    progress: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: vars.colors.white }],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', height: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProgressiveBar>;

// 스토리 - 기본(50%)
export const Default: Story = {
  args: {
    progress: 50,
  },
};

// 스토리 - 낮음(0%)
export const ZeroProgress: Story = {
  args: {
    progress: 0,
  },
};

// 스토리 - 높음(100%)
export const FullProgress: Story = {
  args: {
    progress: 100,
  },
};
