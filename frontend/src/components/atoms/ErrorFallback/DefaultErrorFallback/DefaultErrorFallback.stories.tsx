import { MemoryRouter } from 'react-router-dom';

import DefaultErrorFallback from '.';
import { storyFullScreenContainer } from '../../../../styles/styles.css';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DefaultErrorFallback> = {
  title: 'atoms/DefaultErrorFallback',
  component: DefaultErrorFallback,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div className={storyFullScreenContainer}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
