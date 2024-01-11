import { MemoryRouter, Route, Routes } from 'react-router-dom';

import ErrorPage from '.';
import * as styles from './styles.css';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'pages/ErrorPage',
  component: ErrorPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={[{ pathname: `/error` }]}>
        <Routes>
          <Route path="/error" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof ErrorPage>;

export default meta;

export const Default = () => (
  <div className={styles.storyContainer}>
    <ErrorPage />
  </div>
);
