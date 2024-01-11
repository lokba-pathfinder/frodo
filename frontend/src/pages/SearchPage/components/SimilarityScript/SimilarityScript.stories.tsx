import SimilarityScript from '.';
import { searchDataList } from '../../../../mocks/data/search';
import { storyFullScreenContainer } from '../../../../styles/styles.css';
import { vars } from '../../../../styles/themes.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SimilarityScript> = {
  title: 'pages/SearchPage/SimilarityScript',
  component: SimilarityScript,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: vars.colors.white }],
    },
  },
};

export default meta;

type Story = StoryObj<typeof SimilarityScript>;

export const Default: Story = {
  args: {
    contents: searchDataList[0].summaryScript.contents,
    grade: 'high',
    score: 93,
  },
  decorators: [
    (Story) => (
      <div className={storyFullScreenContainer}>
        <Story />
      </div>
    ),
  ],
};
