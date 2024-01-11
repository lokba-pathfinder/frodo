import { ReactElement } from 'react';

interface SearchResultProps {
  loadingFallback: ReactElement;
  emptyFallback: ReactElement;
  successFallback: ReactElement;
  isFetched: boolean;
  hasHighlightedItem: boolean;
}

const SearchResult = ({
  loadingFallback,
  emptyFallback,
  successFallback,
  hasHighlightedItem,
  isFetched,
}: SearchResultProps) => {
  if (isFetched === false) return loadingFallback;

  if (hasHighlightedItem === false) return emptyFallback;

  return successFallback;
};

export default SearchResult;
