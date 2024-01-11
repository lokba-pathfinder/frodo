import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useSearchParams } from 'react-router-dom';

import PageLayout from '../../components/modules/PageLayout';
import { SearchData } from '../../types/api';
import { isEmptyString } from '../../utils/string';
import SearchList from './components/SearchList';
import SearchListSkeleton from './components/SearchList/SearchListSkeleton';
import SearchPageErrorFallback from './components/SearchPageErrorFallback';
import SearchResult from './components/SearchResult';
import EmptySearchResult from './components/SearchResult/EmptySearchResult';
import HighlightedSearchResult from './components/SearchResult/HighlightedSearchResult';
import LoadingResultSkeleton from './components/SearchResult/LoadingSearchResult';
import * as styles from './styles.css';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

const SearchPage = () => {
  const navigate = useNavigate(); // 추가: navigate 함수 사용을 위해 가져옴
  const { reset } = useQueryErrorResetBoundary();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const [highlightedItem, setHighlightedItem] = useState<SearchData | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  const handleClickItem = (item: SearchData) => {
    setHighlightedItem(item);
  };

  useEffect(() => {
    if (isEmptyString(query)) {
      navigate('/');
    }
  }, [navigate, query]);

  if (isEmptyString(query)) {
    return null;
  }

  return (
    <ErrorBoundary FallbackComponent={SearchPageErrorFallback} onReset={reset}>
      <PageLayout
        left={
          <div className={styles.left}>
            <SearchResult
              loadingFallback={<LoadingResultSkeleton />}
              emptyFallback={<EmptySearchResult />}
              successFallback={
                <HighlightedSearchResult
                  highlightedItem={highlightedItem as SearchData}
                  query={query}
                />
              }
              isFetched={isFetched}
              hasHighlightedItem={highlightedItem !== null}
            />
          </div>
        }
        right={
          <Suspense fallback={<SearchListSkeleton />}>
            <SearchList
              query={query}
              highlightedId={highlightedItem?.searchId}
              onFetch={() => setIsFetched(true)}
              onClickSearchItem={handleClickItem}
            />
          </Suspense>
        }
      />
    </ErrorBoundary>
  );
};

export default SearchPage;
