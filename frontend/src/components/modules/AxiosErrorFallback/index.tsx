import { PropsWithClassName } from '../../../types/utils';
import DefaultErrorFallback from '../../atoms/ErrorFallback/DefaultErrorFallback';
import RetryErrorFallback from '../../atoms/ErrorFallback/RetryErrorFallback';
import { AxiosError } from 'axios';

export interface AxiosErrorFallbackProps extends PropsWithClassName {
  error: AxiosError;
  resetErrorBoundary: (...args: unknown[]) => void;
}

const AxiosErrorFallback = ({ error, resetErrorBoundary, className }: AxiosErrorFallbackProps) => {
  const statusCode = error.response?.status;
  const handleClick = () => resetErrorBoundary();

  if (statusCode === undefined) {
    return <DefaultErrorFallback className={className} />;
  }

  return <RetryErrorFallback className={className} statusCode={statusCode} onClick={handleClick} />;
};

export default AxiosErrorFallback;
