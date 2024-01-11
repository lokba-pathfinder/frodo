import { Link, useNavigate } from 'react-router-dom';

import Header from '../../components/modules/Header';
import SearchForm from '../../components/modules/SearchForm';
import useGlobalLangState from '../../hooks/useGlobalLangState';
import { keywords } from '../../mocks/data/home';
import { Contents } from '../../types/detail';
import { isEmptyString } from '../../utils/string';
import Keyword from './components/Keyword';
import * as styles from './styles.css';

const metaData: {
  title: {
    firstLine: {
      en: { text: string; style: string }[];
      ko: { text: string; style: string }[];
    };
    secondLine: {
      en: { text: string; style: string }[];
      ko: { text: string; style: string }[];
    };
  };
  placeholder: Contents<string>;
} = {
  title: {
    firstLine: {
      en: [
        { text: 'Uncover ', style: styles.em.highlighted },
        { text: 'the essense of ', style: styles.em.normal },
        { text: 'Youtube videos ', style: styles.em.highlighted },
      ],
      ko: [
        { text: 'Youtube 동영상', style: styles.em.highlighted },
        { text: '의 ', style: styles.em.normal },
        { text: '본질', style: styles.em.highlighted },
        { text: '을 파악합니다', style: styles.em.normal },
      ],
    },
    secondLine: {
      en: [
        { text: 'with ', style: styles.em.normal },
        { text: 'concise summaries ', style: styles.em.highlighted },
        { text: 'and ', style: styles.em.normal },
        { text: 'visual mappings.', style: styles.em.highlighted },
      ],
      ko: [
        { text: '간결한 요약', style: styles.em.highlighted },
        { text: '과 ', style: styles.em.normal },
        { text: '시각적 매핑', style: styles.em.highlighted },
        { text: '을 느껴보세요', style: styles.em.normal },
      ],
    },
  },
  placeholder: { ko: '원하는 내용을 검색하세요.', en: 'Search what you want.' },
};

const HomePage = () => {
  const lang = useGlobalLangState();

  const navigate = useNavigate();

  const handleSubmit = (query: string) => {
    if (isEmptyString(query)) {
      return;
    }

    navigate(`/search?query=${query}`);
  };

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>
            <p>
              {metaData.title.firstLine[lang].map(({ text, style }, lineNo) => {
                const key = `${lang}-${lineNo}`;

                return (
                  <em className={style} key={key}>
                    {text}
                  </em>
                );
              })}
            </p>
            <p>
              {metaData.title.secondLine[lang].map(({ text, style }, lineNo) => {
                const key = `${lang}-${lineNo}`;

                return (
                  <em className={style} key={key}>
                    {text}
                  </em>
                );
              })}
            </p>
          </h2>
          <SearchForm
            className={styles.formStyle}
            placeholder={metaData.placeholder[lang]}
            onSubmit={handleSubmit}
          />
          <div className={styles.list}>
            {keywords.map((keyword, lineNo) => {
              const key = `${lang}-${lineNo}`;

              return (
                <Link key={key} to={`/search?query=${keyword[lang]}`}>
                  <Keyword className={styles.keyword} text={keyword[lang]} />
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
