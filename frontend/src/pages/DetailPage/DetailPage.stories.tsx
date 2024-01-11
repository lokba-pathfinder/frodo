import { MemoryRouter, Route, Routes } from 'react-router-dom';

import DetailPage from '.';
import { videoId } from '../../mocks/data/detail';
import detailHandler from '../../mocks/handlers/detailHandler';
import * as styles from './styles.css';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'pages/DetailPage',
  component: DetailPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={[{ pathname: `/detail/${videoId}` }]}>
        <Routes>
          <Route path="/detail/:videoId" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [detailHandler],
    },
  },
  argTypes: {},
} satisfies Meta<typeof DetailPage>;

export default meta;

export const Default = () => (
  <div className={styles.storyContainer}>
    <DetailPage />
  </div>
);
