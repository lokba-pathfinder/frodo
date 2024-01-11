import YouTubePlayer from 'react-youtube';

import { videoId } from '../../../mocks/data/detail';
import useYoutube from '../../../pages/DetailPage/hooks/useYoutubePlayer';
import * as styles from './styles.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof YouTubePlayer> = {
  title: 'modules/YouTubePlayer',
  component: YouTubePlayer,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof YouTubePlayer>;

// 스토리 - 기본
export const Default: Story = {
  args: {
    videoId,
  },
};

export const WithSeekTo = () => {
  const { youtubeRef, seekTo } = useYoutube();

  const handleClick = (time: number) => {
    void seekTo(time);
  };

  return (
    <div className={styles.storyContainer}>
      <YouTubePlayer ref={youtubeRef} videoId={videoId} />
      <div className={styles.storyButtonContainer}>
        <button className={styles.storyButton} onClick={() => handleClick(60)} type="button">
          1분
        </button>
        <button className={styles.storyButton} onClick={() => handleClick(120)} type="button">
          2분
        </button>
      </div>
    </div>
  );
};
