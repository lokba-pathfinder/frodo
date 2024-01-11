import { Link } from 'react-router-dom';

import useGlobalLangState from '../../../../hooks/useGlobalLangState';
import { Contents } from '../../../../types/detail';
import { PropsWithClassName } from '../../../../types/utils';
import classNames from '../../../../utils/classNames';
import * as styles from '../styles.css';

type DefaultErrorFallbackProps = PropsWithClassName;

const metaData: {
  title: Contents<string>;
  descriptions: Contents<string>[];
  linkText: Contents<string>;
} = {
  title: { ko: '알 수 없는 오류', en: 'Unknown Error' },
  descriptions: [
    {
      ko: '이런, 뭔가 잘못되었어요.',
      en: 'Oops, Something went wrong.',
    },
    {
      ko: '알 수 없는 오류가 발생했습니다.',
      en: 'An unknown error occurred.',
    },
  ],
  linkText: {
    ko: '홈으로 가기',
    en: 'Back Home',
  },
};

const DefaultErrorFallback = ({ className }: DefaultErrorFallbackProps) => {
  const lang = useGlobalLangState();

  return (
    <div className={classNames(styles.container, className)}>
      <h2 className={styles.h2}>{metaData.title[lang]}</h2>
      <div className={styles.contents}>
        {metaData.descriptions.map((description, lineNo) => {
          const key = `${lang}-${lineNo}`;

          return (
            <p key={key} className={styles.description}>
              {description[lang]}
            </p>
          );
        })}
      </div>
      <Link to="/" className={styles.button}>
        {metaData.linkText[lang]}
      </Link>
    </div>
  );
};

export default DefaultErrorFallback;
