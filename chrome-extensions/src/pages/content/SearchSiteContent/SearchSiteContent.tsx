import { useEffect, useState, useRef } from 'react';
import SearchList from './components/SearchList';

import { ELEMENTS } from './config';

import { MESSAGE } from '@src/configs/messages';
import { SearchItem } from '@src/configs/types';
import { getSiteName } from '@src/utils/site';
import SummaryScript from './components/SummaryScript';
import EmptyScreen from './components/EmptyScreen';
import Header from '@src/pages/content/shared/components/Header';

const SearchSiteContent = () => {
  const [searchItems, setSearchItems] = useState<SearchItem[] | null>(null);
  const [activeSearchId, setActiveSearchId] = useState<string | null>(null);
  const queryRef = useRef<string>('');

  const activeSearchItem =
    searchItems?.find((searchItem) => searchItem.searchId === activeSearchId) ?? null;

  const handleClickSearchItem = (data: SearchItem) => {
    setActiveSearchId(data.searchId);
  };

  useEffect(() => {
    const siteName = getSiteName();
    const queryElement = document.getElementById(ELEMENTS[siteName].QUERY.id);

    if (queryElement === null) return;

    const query = (queryElement as HTMLInputElement | HTMLTextAreaElement).value;
    queryRef.current = query;

    chrome.runtime.sendMessage(
      { message: MESSAGE.GET_SEARCH_RESULT, payload: { query } },
      (res: SearchItem[]) => {
        setSearchItems(res);

        if (res.length >= 1) {
          setActiveSearchId(res[0].searchId);
        }
      },
    );
  }, []);

  if (searchItems?.length === 0) {
    return (
      <div className="searchSiteContent-container">
        <Header />
        <EmptyScreen query={queryRef.current} />
      </div>
    );
  }

  return (
    <div className="searchSiteContent-container">
      <Header />
      {activeSearchItem && <SummaryScript summaryScript={activeSearchItem.summaryScript} />}
      {searchItems && (
        <SearchList
          searchItems={searchItems}
          activeId={activeSearchId}
          query={queryRef.current}
          onClick={handleClickSearchItem}
        />
      )}
    </div>
  );
};

export default SearchSiteContent;
