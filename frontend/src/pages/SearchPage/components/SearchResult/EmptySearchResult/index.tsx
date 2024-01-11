import enlarge from '../../../../../assets/enlarge.png';
import useGlobalLangState from '../../../../../hooks/useGlobalLangState';
import { Contents } from '../../../../../types/detail';
import * as styles from './styles.css';

const metaData: {
  title: Contents<string>;
  tips: Contents<string>[];
} = {
  title: { en: 'Search Tips', ko: '검색 팁' },
  tips: [
    { en: 'Verify word spellings.', ko: '단어의 철자가 정확한지 확인해 주세요.' },
    { en: 'Retry with common search terms.', ko: '일반적인 검색어로 다시 검색해 보세요.' },
    {
      en: 'Use fewer words or try different keywords.',
      ko: '검색어의 단어 수를 줄이거나, 다른 검색어로 검색해 보세요.',
    },
  ],
};

const EmptySearchResult = () => {
  const lang = useGlobalLangState();

  return (
    <div className={styles.backgroundContainer}>
      <img className={styles.enlargeImage} src={enlarge} alt="shake item" />
      <h2 className={styles.title}>{metaData.title[lang]}</h2>
      <div className={styles.tipBox}>
        <ul className={styles.tips}>
          {metaData.tips.map((tip, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li className={styles.tip} key={index}>
              {tip[lang]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmptySearchResult;
