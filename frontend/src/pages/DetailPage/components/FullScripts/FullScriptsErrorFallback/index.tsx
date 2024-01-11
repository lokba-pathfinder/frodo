import AxiosErrorFallback, {
  AxiosErrorFallbackProps,
} from '../../../../../components/modules/AxiosErrorFallback';
import classNames from '../../../../../utils/classNames.ts';
import * as styles from './styles.css';

const FullScriptsErrorFallback = ({
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

export default FullScriptsErrorFallback;
