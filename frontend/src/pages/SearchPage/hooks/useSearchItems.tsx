import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import useSearchDataListQuery from './useSearchResultQuery';

const useSearchItems = (query: string) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetched } = useSearchDataListQuery(query);
  const total = data?.pages[0].total ?? 0;
  const searchItems = useMemo(() => data?.pages.flatMap((page) => page.searchDataList), [data]);

  const { ref: loaderRef, inView } = useInView({});

  useEffect(() => {
    if (!inView || !hasNextPage || isFetching) {
      return;
    }

    void fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage, isFetching]);

  return { total, searchItems, hasNextPage, loaderRef, isFetched };
};

export default useSearchItems;
