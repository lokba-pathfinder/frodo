import { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

type UseYoutubeOptions = {
  onCurrentTimeChange: (currentTime: number) => void;
};

// 유튜브 영상 컴포넌트를 조정할 수 있는 ref와 함수를 반환합니다.
const useYoutube = (options?: UseYoutubeOptions) => {
  const youtubeRef = useRef<YouTube | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const clockCallback = async () => {
        if (youtubeRef === null || youtubeRef.current === null) {
          return;
        }

        const youtubePlayer = youtubeRef.current.internalPlayer;
        const playerState = await youtubePlayer?.getPlayerState();

        if (playerState !== YouTube.PlayerState.PLAYING || options === undefined) {
          return;
        }

        const currentTime = (await youtubeRef.current.internalPlayer?.getCurrentTime()) ?? 0;
        options.onCurrentTimeChange(Math.floor(currentTime));
      };

      void clockCallback();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Youtube 플레이어(iframe)가 기본값(640 * 390) 대신 반응형 크기를 사용합니다.
  const responsiveOptions = {
    width: '100%',
    height: '100%',
  };

  // 유튜브 영상의 진행 시간을 time으로 이동합니다.
  const seekTo = async (time: number) => {
    if (youtubeRef === null || youtubeRef.current === null) {
      return;
    }

    const youtubePlayer = youtubeRef.current.internalPlayer;
    await youtubePlayer?.seekTo(time, true);
  };

  // 유튜브 재생상태를 일시정지 상태로 변경합니다.
  const pause = async () => {
    if (youtubeRef === null || youtubeRef.current === null) {
      return;
    }

    const youtubePlayer = youtubeRef.current.internalPlayer;
    await youtubePlayer?.pauseVideo();
  };

  return {
    youtubeRef,
    responsiveOptions,
    seekTo,
    pause,
  };
};

export default useYoutube;
