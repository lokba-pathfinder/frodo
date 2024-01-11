import { ReactElement } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import useGlobalLangState from '../../../hooks/useGlobalLangState';
import { Contents } from '../../../types/detail';
import { isEmptyString } from '../../../utils/string';
import Header from '../Header';
import SearchForm from '../SearchForm';
import * as styles from './styles.css';

interface PageLayoutProps {
  left: ReactElement;
  right: ReactElement;
}

const metaData: {
  placeholder: Contents<string>;
} = {
  placeholder: { ko: '원하는 내용을 검색하세요.', en: 'Search what you want.' },
};

const PageLayout = ({ left, right }: PageLayoutProps) => {
  const lang = useGlobalLangState();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const navigate = useNavigate();

  const handleSubmit = (_query: string) => {
    if (isEmptyString(_query)) {
      return;
    }

    navigate(`/search?query=${_query}`);
    navigate(0);
  };

  return (
    <div className={styles.layout}>
      <Header
        center={
          <SearchForm
            className={styles.formStyle}
            defaultValue={query}
            placeholder={metaData.placeholder[lang]}
            onSubmit={handleSubmit}
          />
        }
      />
      <main className={styles.main}>
        <section className={styles.left}>{left}</section>
        <section className={styles.right}>{right}</section>
      </main>
    </div>
  );
};

export default PageLayout;
