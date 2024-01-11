import { MouseEventHandler } from 'react';

import useGlobalLangState from '../../../../hooks/useGlobalLangState';
import { Contents } from '../../../../types/detail';
import { PropsWithClassName } from '../../../../types/utils';
import classNames from '../../../../utils/classNames';
import * as styles from '../styles.css';

interface RetryErrorFallbackProps extends PropsWithClassName {
  statusCode: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const metaData: {
  title: Contents<string>;
  descriptions: Contents<string>[];
  buttonText: Contents<string>;
} = {
  title: { ko: '알 수 없는 오류', en: 'Unknown Error' },
  descriptions: [
    {
      ko: '이런, 뭔가 잘못되었어요.',
      en: 'Oops, Something went wrong.',
    },
    {
      ko: '다시 시도해주세요.',
      en: 'Please try again.',
    },
  ],
  buttonText: {
    ko: '다시 시도하기',
    en: 'Retry',
  },
};

const RetryErrorFallback = ({ statusCode, onClick, className }: RetryErrorFallbackProps) => {
  const lang = useGlobalLangState();

  return (
    <div className={classNames(styles.container, className)}>
      <h2 className={styles.h2}>{statusCode}</h2>
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
      <button type="button" className={styles.button} onClick={onClick}>
        {metaData.buttonText[lang]}
      </button>
    </div>
  );
};

export default RetryErrorFallback;
