import { useState } from 'react';

import Tooltip, { Placement } from '.';
import { PLACEMENTS } from '../../../constants/tooltip';
import { vars } from '../../../styles/themes.css';
import * as styles from './styles.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: vars.colors.white }],
    },
  },
  argTypes: {},
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    text: '툴팁입니다. 아무거나 작성이 가능합니다.',
    children: <div>마우스를 올려보세요 😄</div>,
  },
  decorators: [
    (Story) => (
      <div className={styles.storyContainer}>
        <Story />
      </div>
    ),
  ],
};

export const Controls = () => {
  const [placement, setPlacement] = useState<Placement>('top-center');

  return (
    <div className={styles.storyContainer}>
      <Tooltip text="툴팁입니다. 아무거나 작성이 가능합니다." placement={placement}>
        마우스를 올려보세요 😄
      </Tooltip>
      <div className={styles.storyButtonContainer}>
        {PLACEMENTS.map((text) => (
          <button
            type="button"
            onClick={() => setPlacement(text)}
            className={placement === text ? styles.storyButton.active : styles.storyButton.default}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};
