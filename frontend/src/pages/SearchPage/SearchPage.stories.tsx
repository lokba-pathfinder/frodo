import { MemoryRouter } from 'react-router-dom';

import SearchPage from '.';
import { query } from '../../mocks/data/search';
import searchHandler from '../../mocks/handlers/searchHandler';
import * as styles from './styles.css';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'pages/SearchPage',
  component: SearchPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={[{ pathname: '/search', search: `?query=${query}` }]}>
        <Story />
      </MemoryRouter>
    ),
  ],

  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [searchHandler],
    },
  },
  argTypes: {},
} satisfies Meta<typeof SearchPage>;

export default meta;

export const Default = () => (
  <div className={styles.storyContainer}>
    <SearchPage />
  </div>
);
