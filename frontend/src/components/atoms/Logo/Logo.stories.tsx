import Logo from '.';
import { vars } from '../../../styles/themes.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'atoms/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: vars.colors.white }],
    },
  },
  argTypes: {},
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
