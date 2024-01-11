import ProgressiveThumbnail from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProgressiveThumbnail> = {
  title: 'modules/ProgressiveThumbnail',
  component: ProgressiveThumbnail,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ProgressiveThumbnail>;

const EXAMPLE_YOUTUBE_URL = 'https://img.youtube.com/vi/FvchLmGiXfY/maxresdefault.jpg';

// 스토리 - 기본
export const Default: Story = {
  args: {
    imageUrl: EXAMPLE_YOUTUBE_URL,
    alt: 'Thumbnail Image',
    startTime: 60,
    totalTime: 120,
  },
};

// Mark<Sean.pf>: 이미지가 로딩되지 않는 경우, 비율이 틀린 경우를 추가하면 좋을 것 같아요.
// 스토리 - 낮음(0%)
export const ZeroProgress: Story = {
  args: {
    imageUrl: EXAMPLE_YOUTUBE_URL,
    alt: 'Thumbnail Image',
    startTime: 0,
    totalTime: 120,
  },
};

// 스토리 - 높음(100%)
export const FullProgress: Story = {
  args: {
    imageUrl: EXAMPLE_YOUTUBE_URL,
    alt: 'Thumbnail Image',
    startTime: 120,
    totalTime: 120,
  },
};
