import AxiosErrorFallback, {
  AxiosErrorFallbackProps,
} from '../../../../components/modules/AxiosErrorFallback';
import PageLayout from '../../../../components/modules/PageLayout';
import EmptySearchResult from '../SearchResult/EmptySearchResult';

const SearchPageErrorFallback = ({
  error,
  resetErrorBoundary,
  className,
}: AxiosErrorFallbackProps) => (
  <PageLayout
    left={<EmptySearchResult />}
    right={
      <AxiosErrorFallback
        className={className}
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    }
  />
);

export default SearchPageErrorFallback;
