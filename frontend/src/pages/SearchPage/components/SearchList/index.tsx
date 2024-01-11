import { useEffect, useState } from 'react';

import useGlobalLangState from '../../../../hooks/useGlobalLangState';
import { SearchData } from '../../../../types/api';
import { Contents } from '../../../../types/detail';
import useSearchItems from '../../hooks/useSearchItems';
import SearchItem from '../SearchItem';
import SearchItemSkeleton from '../SearchItem/SearchItemSkeleton';
import EmptySearchList from './EmptySearchList';
import * as styles from './styles.css';

interface SearchListProps {
  query: string;
  highlightedId?: string;
  onClickSearchItem: (item: SearchData) => void;
  onFetch: () => void;
}

const metaData: {
  title: Contents<string>;
  description: Contents<string>;
  noResults: Contents<string>;
} = {
  title: { ko: '검색 결과', en: 'Search Results' },
  description: { ko: '개의 검색 결과', en: ' search results' },
  noResults: { ko: '검색 결과 없음', en: 'no search results' },
};

const SearchList = ({ query, highlightedId, onClickSearchItem, onFetch }: SearchListProps) => {
  const lang = useGlobalLangState();

  const [isInitialized, setIsInitialized] = useState(false);
  const { isFetched, searchItems, hasNextPage, loaderRef, total } = useSearchItems(query);

  // TODO: SearchPage fetching 상태 관리 리팩토링
  // 스켈레톤 상태 변경
  useEffect(() => {
    if (!isFetched) {
      return;
    }

    setIsInitialized(true);
    onFetch();
  }, [isFetched]);

  // 검색 결과에 따라 빈 화면 또는 가장 위 아이템 하이라이트
  useEffect(() => {
    if (
      !isInitialized ||
      searchItems === undefined ||
      searchItems.length === 0 ||
      onClickSearchItem === undefined
    ) {
      return;
    }

    setIsInitialized(false);
    onClickSearchItem(searchItems[0]);
  }, [isInitialized, onClickSearchItem, searchItems]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h3 className={styles.title}>{metaData.title[lang]}</h3>
        <p className={styles.description}>
          {searchItems && searchItems.length > 0
            ? `${total}${metaData.description[lang]}`
            : metaData.noResults[lang]}
        </p>
      </header>
      <ul className={styles.searchList}>
        {searchItems && searchItems.length > 0 ? (
          <>
            {searchItems.map((item) => (
              <SearchItem
                key={item.searchId}
                item={item}
                isHighlighted={item.searchId === highlightedId}
                onClick={() => onClickSearchItem?.(item)}
              />
            ))}
            {hasNextPage && (
              <div ref={loaderRef}>
                <SearchItemSkeleton />
                <SearchItemSkeleton />
                <SearchItemSkeleton />
              </div>
            )}
          </>
        ) : (
          <EmptySearchList query={query} />
        )}
      </ul>
    </div>
  );
};

export default SearchList;
