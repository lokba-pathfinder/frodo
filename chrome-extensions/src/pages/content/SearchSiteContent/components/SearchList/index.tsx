import { SearchItem as SearchItemType } from '@src/configs/types';
import SearchItem from '../SearchItem';
import { PINNECT_AI_URL } from '@src/configs/constants';
import useGlobalLangState from '@src/pages/content/shared/hooks/useGlobalLangState';

interface SearchListProps {
  searchItems: SearchItemType[];
  query: string;
  activeId: string | null;
  onClick: (data: SearchItemType) => void;
}

const SearchList = ({ searchItems, query, activeId, onClick }: SearchListProps) => {
  const lang = useGlobalLangState();

  return (
    <div className="searchList-container">
      <div className="searchList-desc">
        {lang === 'en' ? (
          <>
            <h3>
              Pinnect.ai search results for <em>&#34;{query}&#34;</em>
            </h3>
            <p>{searchItems.length} search results</p>
          </>
        ) : (
          <>
            <h3>
              <em>&#34;{query}&#34;</em> 관련 Pinnect.ai 검색 결과
            </h3>
            <p>{searchItems.length}개의 검색 결과</p>
          </>
        )}
      </div>
      <div className="searchList-scroll">
        {searchItems.map((searchItem) => (
          <SearchItem
            searchItem={searchItem}
            key={searchItem.searchId}
            active={activeId === searchItem.searchId}
            onClick={onClick}
          />
        ))}
        <a
          href={`${PINNECT_AI_URL}/search?query=${query}`}
          target="_blank"
          rel="noreferrer"
          className="searchList-view-more"
        >
          {lang === 'en' ? 'View more on Pinnect.ai' : 'Pinnect.ai에서 더보기'}
        </a>
      </div>
    </div>
  );
};

export default SearchList;
