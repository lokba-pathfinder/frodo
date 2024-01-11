import { MemoryRouter } from 'react-router-dom';

import PageLayout from '.';
import { storyFullScreenContainer } from '../../../styles/styles.css';
import { vars } from '../../../styles/themes.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'modules/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: vars.colors.white }],
    },
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

  argTypes: {},
} satisfies Meta<typeof PageLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { left: <div>왼쪽 영역입니다.</div>, right: <div>오른쪽 영역입니다.</div> },
};
