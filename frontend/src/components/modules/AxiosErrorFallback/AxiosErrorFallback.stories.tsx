import { MemoryRouter } from 'react-router-dom';

import AxiosErrorFallback from '.';
import { Meta, StoryObj } from '@storybook/react';
import { AxiosError } from 'axios';

const meta: Meta<typeof AxiosErrorFallback> = {
  title: 'modules/AxiosErrorFallback',
  component: AxiosErrorFallback,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultErrorFallback: Story = {
  args: {
    error: {} as AxiosError,
    resetErrorBoundary: () => {},
  },
};

export const RetryErrorFallback: Story = {
  args: {
    error: {
      response: {
        status: 500,
      },
    } as AxiosError,
    resetErrorBoundary: () => {},
  },
};
