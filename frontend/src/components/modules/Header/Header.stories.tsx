import { MemoryRouter } from 'react-router-dom';

import Header from '.';
import { storyFullScreenContainer } from '../../../styles/styles.css';
import { vars } from '../../../styles/themes.css';
import SearchForm from '../SearchForm';
import * as styles from './styles.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'modules/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div className={storyFullScreenContainer}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: vars.colors.white }],
    },
  },
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCenter: Story = {
  args: {
    center: <SearchForm className={styles.formStyle} placeholder="Search what you want." />,
  },
};
