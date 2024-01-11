import useGlobalLangState from '../../../../../hooks/useGlobalLangState';
import * as styles from './styles.css';

interface FullScriptsSkeletonProps {
  itemCount?: number;
}

const metaData = {
  head: { ko: '전체 스크립트', en: 'Full Scripts' },
};

const FullScriptsSkeleton = ({ itemCount = 3 }: FullScriptsSkeletonProps) => {
  const lang = useGlobalLangState();

  return (
    <article>
      <header className={styles.header}>
        <h3 className={styles.head}>{metaData.head[lang]}</h3>
      </header>
      {Array.from({ length: itemCount }, (_, lineNo) => (
        <div key={lineNo} className={styles.fullScript}>
          <div className={styles.startTime} />
          <div className={styles.contents}>
            <div className={styles.content} />
            <div className={styles.content} />
            <div className={styles.content} />
          </div>
        </div>
      ))}
    </article>
  );
};

export default FullScriptsSkeleton;
