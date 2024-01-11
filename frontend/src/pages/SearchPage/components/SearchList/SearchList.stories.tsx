import SearchList from '.';
import { query } from '../../../../mocks/data/search';
import searchHandler from '../../../../mocks/handlers/searchHandler';
import { storyFullScreenContainer } from '../../../../styles/styles.css';
import { vars } from '../../../../styles/themes.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchList> = {
  title: 'pages/SearchPage/SearchList',
  component: SearchList,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: vars.colors.white }],
    },
    msw: {
      handlers: [searchHandler],
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

type Story = StoryObj<typeof SearchList>;

export const Default: Story = {
  args: {
    query,
  },
};
