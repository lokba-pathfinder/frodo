import VideoInfo from '.';
import { videoInfos } from '../../../mocks/data/common';
import { storyContainer } from './styles.css';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'modules/VideoInfo',
  component: VideoInfo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof VideoInfo>;

export default meta;

export const Default = () => <VideoInfo className={storyContainer} videoInfo={videoInfos[0]} />;
