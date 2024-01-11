import type { PropsWithClassName } from '../../../types/utils';
import classNames from '../../../utils/classNames';
import ProgressiveBar from '../../atoms/ProgressiveBar';
import * as styles from './styles.css';

interface ProgressiveThumbnailProps extends PropsWithClassName {
  imageUrl: string;
  alt: string;
  startTime: number; // 재생 시간 (sec)
  totalTime: number; // 전체 시간 (sec)
}

// 이미지 로딩으로 인한 레이아웃 시프트를 방지하기 위해 className에 크기를 지정하는 것이 좋습니다.
// width를 포함하여 크기를 지정할 경우 aspect-ratio 속성으로 비율에 맞춰 세로를 지정할 수 있습니다.
const ProgressiveThumbnail = ({
  imageUrl,
  alt,
  startTime,
  totalTime,
  className,
}: ProgressiveThumbnailProps) => {
  const progress = (100 * startTime) / totalTime; // 진행률 (%)

  return (
    <div className={classNames(styles.container, className)}>
      <img className={styles.image} src={imageUrl} alt={alt} />
      <ProgressiveBar className={styles.progressiveBar} progress={progress} />
    </div>
  );
};

export default ProgressiveThumbnail;
