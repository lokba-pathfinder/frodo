import { waitForElementReady } from '@src/utils/element-utils';
import { useEffect, useState } from 'react';

type YoutubePlayer = HTMLVideoElement;

const useYoutubePlayer = (onPlayTimeChange?: (playTime: number) => void) => {
  const [player, setPlayer] = useState<YoutubePlayer>(null);

  useEffect(() => {
    waitForElementReady<YoutubePlayer>('#movie_player > div.html5-video-container > video')
      .then((youtubePlayer) => {
        setPlayer(youtubePlayer);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (player === null || onPlayTimeChange === undefined) {
      return;
    }

    const intervalId = setInterval(() => {
      if (player.paused) {
        return;
      }
      onPlayTimeChange(player.currentTime);
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(intervalId);
    };
  }, [player, onPlayTimeChange]);

  const seekTo = (time: number) => {
    if (player === null) {
      return;
    }

    player.currentTime = time;
  };

  return { seekTo };
};

export default useYoutubePlayer;
