import { Contents } from '@src/configs/types';
import useGlobalLangState from '@src/pages/content/shared/hooks/useGlobalLangState';

interface EmptyScreenProps {
  query: string;
}

const data: {
  tipTitle: Contents<string>;
  tips: Contents<string>[];
} = {
  tipTitle: { en: 'Search Tips', ko: '검색 팁' },
  tips: [
    { en: 'Verify word spellings.', ko: '단어의 철자가 정확한지 확인해 주세요.' },
    { en: 'Retry with common search terms.', ko: '일반적인 검색어로 다시 검색해 보세요.' },
    {
      en: 'Use fewer words or try different keywords.',
      ko: '검색어의 단어 수를 줄이거나, 다른 검색어로 검색해 보세요.',
    },
  ],
};

const EmptyScreen = ({ query }: EmptyScreenProps) => {
  const lang = useGlobalLangState();

  return (
    <div className="emptyScreen-container">
      <h2>
        {lang === 'en' && <>No search results for</>}
        <em>&#34;{query}&#34;</em>
        {lang === 'ko' && <>에 대한 검색결과가 없습니다.</>}
      </h2>

      <div className="emptyScreen-tipBox">
        <h3>data.tipTitle[lang]</h3>
        <ul className="emptyScreen-tips">
          {data.tips.map((tip, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li className="emptyScreen-tip" key={index}>
              tip[lang]
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmptyScreen;
