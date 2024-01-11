import type { PropsWithClassName } from '../../../types/utils';
import classNames from '../../../utils/classNames';
import * as styles from './styles.css';

interface ProgressiveBarProps extends PropsWithClassName {
  progress: number; // 0~100 사이의 유리수
}

// 전달된 progress를 0과 100 사이 범위로 제한합니다.
const limitToProgressRange = (progress: number) => Math.min(100, Math.max(0, progress));

const ProgressiveBar = ({ progress, className }: ProgressiveBarProps) => {
  const range = limitToProgressRange(progress);

  return (
    <div className={classNames(styles.progressiveBar, className)}>
      <div className={styles.progressBar} style={{ width: `${range}%` }} />
    </div>
  );
};

export default ProgressiveBar;
