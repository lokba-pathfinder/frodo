/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link } from 'react-router-dom';

import Chrome from '../../../assets/chrome.png';
import En from '../../../assets/en.png';
import Ko from '../../../assets/ko.png';
import { CHROME_WEB_STORE_URL } from '../../../constants/url';
import useGlobalLangAction from '../../../hooks/useGlobalLangAction';
import useGlobalLangState from '../../../hooks/useGlobalLangState';
import { Contents } from '../../../types/detail';
import Logo from '../../atoms/Logo';
import Tooltip from '../../atoms/Tooltip';
import * as styles from './styles.css';

interface HeaderProps {
  center?: JSX.Element;
}

const metaData: {
  menus: {
    chrome: Contents<string>;
    language: Contents<string>;
  };
} = {
  menus: {
    chrome: { ko: '크롬 웹 스토어', en: 'chrome web store' },
    language: { ko: '언어', en: 'language' },
  },
};

const Header = ({ center }: HeaderProps) => {
  const lang = useGlobalLangState();
  const setLang = useGlobalLangAction();

  const handleClickButton = () => {
    setLang(lang === 'en' ? 'ko' : 'en');
  };

  return (
    <header className={styles.container}>
      <h1 className={styles.left}>
        <Link to="/" className={styles.link}>
          <Logo />
        </Link>
      </h1>
      <div className={styles.center}>{center}</div>
      <div className={styles.right}>
        <div className={styles.menu}>
          <Tooltip
            text={metaData.menus.chrome[lang]}
            placement="bottom-center"
            className={styles.tooltip}
          >
            <a href={CHROME_WEB_STORE_URL} target="_blank" rel="noreferrer">
              <div className={styles.iconBox}>
                <img src={Chrome} alt="Chrome" className={styles.icon} />
              </div>
            </a>
          </Tooltip>
        </div>
        <div className={styles.menu}>
          <Tooltip
            text={metaData.menus.language[lang]}
            placement="bottom-center"
            className={styles.tooltip}
          >
            <div className={styles.iconBox} onClick={handleClickButton}>
              {lang === 'en' ? (
                <img src={En} alt="English" className={styles.icon} />
              ) : (
                <img src={Ko} alt="Korean" className={styles.icon} />
              )}
            </div>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default Header;
