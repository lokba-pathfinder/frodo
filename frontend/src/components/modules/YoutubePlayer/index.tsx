import { useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

import useYoutubePlayer from '../../../pages/DetailPage/hooks/useYoutubePlayer';
import useHighlightStore from '../../../pages/DetailPage/store/useHighlightStore';
import usePlayTimeStore from '../../../pages/DetailPage/store/usePlayTimeStore';
import * as styles from './styles.css';

interface YoutubePlayerProps extends YouTubeProps {
  initStartTime?: number; // 첫 로딩 시 재생시간
  startTime?: number; // 하이라이트 할 재생시간
}

const YoutubePlayer = ({ initStartTime, opts, ...props }: YoutubePlayerProps) => {
  const startTime = useHighlightStore((state) => state.startTime);
  const setPlayTime = usePlayTimeStore((state) => state.setPlayTime);

  const { youtubeRef, seekTo } = useYoutubePlayer({
    onCurrentTimeChange: (currentTime: number) => setPlayTime(currentTime),
  });

  // startTime 상태가 변경되면 유튜브 재생 시간을 동기화합니다.
  useEffect(() => {
    void seekTo(startTime);
  }, [startTime]);

  // 유튜브 iframe 사용자 매개변수
  const optsWithStartTime: YouTubeProps['opts'] = {
    playerVars: {
      start: initStartTime,
      autoplay: 1,
    },
    // 유튜브 영상 내 아이템(재생, 설정, 옵션 등) 위치 지정
    width: '100%',
    height: '100%',
    ...opts,
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <YouTube className={styles.video} ref={youtubeRef} opts={optsWithStartTime} {...props} />
      </div>
    </div>
  );
};

export default YoutubePlayer;
