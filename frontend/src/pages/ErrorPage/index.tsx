import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import trashBox from '../../assets/trash-box.png';
import Header from '../../components/modules/Header';
import SearchForm from '../../components/modules/SearchForm';
import useGlobalLangState from '../../hooks/useGlobalLangState';
import { Contents } from '../../types/detail';
import * as styles from './styles.css';

const metaData: {
  placeholder: Contents<string>;
  title: Contents<string>;
  description: Contents<string>;
  linkText: Contents<string>;
} = {
  placeholder: { ko: '원하는 내용을 검색하세요.', en: 'Search what you want.' },
  title: { ko: '잘못된 페이지입니다', en: 'Page something wrong' },
  description: {
    ko: '로드하려는 페이지를 검색할 수 없습니다.\n사용자 환경을 확인하고 다시 시도하십시오.',
    en: 'The page you were trying to load could not be retrieved.\nPlease check your environment and try again.',
  },
  linkText: {
    ko: '홈으로 가기',
    en: 'Back Home',
  },
};

const ErrorPage = () => {
  const lang = useGlobalLangState();

  const navigate = useNavigate();

  const handleSubmit = (query: string) => {
    navigate(`/search?query=${query}`);
  };

  useEffect(() => {
    navigate('/error');
  }, [navigate]);

  return (
    <div className={styles.layout}>
      <Header
        center={
          <SearchForm
            className={styles.formStyle}
            placeholder={metaData.placeholder[lang]}
            onSubmit={handleSubmit}
          />
        }
      />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.backgroundContainer}>
            <img className={styles.trashImage} src={trashBox} alt="shake item" />
            <h2 className={styles.title}>{metaData.title[lang]}</h2>
            <p className={styles.description}>{metaData.description[lang]}</p>
            <Link to="/" className={styles.link}>
              {metaData.linkText[lang]}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
