import { MouseEventHandler } from 'react';

import paperclipIcon from '../../../../assets/paperclip.png';
import useGlobalLangState from '../../../../hooks/useGlobalLangState';
import { SummaryScript as SummaryScriptType } from '../../../../types/detail';
import { PropsWithClassName } from '../../../../types/utils';
import classNames from '../../../../utils/classNames';
import * as styles from './styles.css';

interface SummaryScriptProps extends PropsWithClassName {
  summaryScript: SummaryScriptType;
  onClick: MouseEventHandler<HTMLImageElement> | MouseEventHandler<HTMLHeadingElement>;
  isHighlighted?: boolean;
}

const SummaryScript = ({
  summaryScript,
  onClick,
  isHighlighted = false,
  className,
}: SummaryScriptProps) => {
  const lang = useGlobalLangState();

  const { contents } = summaryScript;

  return (
    <article
      className={classNames(styles.container, [styles.highlighted, isHighlighted], className)}
    >
      <header className={styles.header}>
        <img className={styles.icon} src={paperclipIcon} alt="change highlight" onClick={onClick} />
        <h2 className={styles.head} onClick={onClick}>
          {contents[lang].title}
        </h2>
      </header>
      <ul className={styles.unorderedList}>
        {contents[lang].lines.map((content: string, lineNo) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className={styles.listItem} key={lineNo}>
            {content}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default SummaryScript;
