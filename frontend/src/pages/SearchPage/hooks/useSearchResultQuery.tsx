import { fetchSearchResult } from '../../../apis/v3/search';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Param {
  pageParam?: number;
}

const useSearchResultQuery = (query: string) => {
  const queryResults = useInfiniteQuery({
    queryKey: ['searchResult', query],
    queryFn: ({ pageParam = 0 }: Param) => fetchSearchResult(query, pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage?.hasNext) {
        return false;
      }

      return lastPage.pageParam + 1;
    },
    suspense: true,
    cacheTime: 0,
  });

  return queryResults;
};

export default useSearchResultQuery;
