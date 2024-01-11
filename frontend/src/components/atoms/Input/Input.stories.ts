import Input from '.';
import { vars } from '../../../styles/themes.css';
import * as styles from './styles.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: vars.colors.white }],
    },
  },
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSearchType: Story = {
  args: {
    type: 'search',
    className: styles.baseStyle,
    placeholder: '검색어를 입력하세요',
  },
};

export const WithMaxLength: Story = {
  args: {
    maxLength: 10,
    className: styles.baseStyle,
    placeholder: 'Max Length : 10',
  },
};
