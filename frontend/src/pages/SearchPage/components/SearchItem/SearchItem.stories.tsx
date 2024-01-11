import SearchItem from '.';
import { searchDataList } from '../../../../mocks/data/search';
import { vars } from '../../../../styles/themes.css';
import { storyContainer } from './styles.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchItem> = {
  title: 'pages/SearchPage/SearchItem',
  component: SearchItem,
  argTypes: {},
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: vars.colors.white }],
    },
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

type Story = StoryObj<typeof SearchItem>;

export const Default: Story = {
  args: {
    item: searchDataList[0],
  },
};

export const Highlighted: Story = {
  args: {
    item: searchDataList[0],
    isHighlighted: true,
  },
};
