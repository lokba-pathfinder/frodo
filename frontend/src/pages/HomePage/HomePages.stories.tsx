import { MemoryRouter } from 'react-router-dom';

import HomePage from '.';
import * as styles from './styles.css';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'pages/HomePage',
  component: HomePage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <Story />
      </MemoryRouter>
    ),
  ],

  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof HomePage>;

export default meta;

export const Default = () => (
  <div className={styles.storyContainer}>
    <HomePage />
  </div>
);
