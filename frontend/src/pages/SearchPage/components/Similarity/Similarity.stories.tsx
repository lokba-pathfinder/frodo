import Similarity from '.';
import { storyFullScreenContainer } from '../../../../styles/styles.css';
import { vars } from '../../../../styles/themes.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Similarity> = {
  title: 'pages/SearchPage/Similarity',
  component: Similarity,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: vars.colors.white }],
    },
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

type Story = StoryObj<typeof Similarity>;

export const High: Story = {
  args: {
    grade: 'high',
    score: 93,
  },
};

export const Medium: Story = {
  args: {
    grade: 'medium',
    score: 73,
  },
};

export const Low: Story = {
  args: {
    grade: 'low',
    score: 53,
  },
};
