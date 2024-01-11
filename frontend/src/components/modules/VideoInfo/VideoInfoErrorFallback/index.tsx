import classNames from '../../../../utils/classNames.ts';
import AxiosErrorFallback, { AxiosErrorFallbackProps } from '../../AxiosErrorFallback';
import * as styles from './styles.css.ts';

const VideoInfoErrorFallback = ({
  error,
  resetErrorBoundary,
  className,
}: AxiosErrorFallbackProps) => (
  <AxiosErrorFallback
    className={classNames(styles.container, className)}
    error={error}
    resetErrorBoundary={resetErrorBoundary}
  />
);

export default VideoInfoErrorFallback;
