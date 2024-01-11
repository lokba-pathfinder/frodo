import useGlobalLangState from '../../../../../hooks/useGlobalLangState';
import SummaryScriptSkeleton from '../../SummaryScript/SummaryScriptSkeleton';
import * as styles from './styles.css';

const metaData = {
  head: { ko: '요약 스크립트', en: 'Summary Scripts' },
};

interface SummaryScriptsSkeletonProps {
  itemCount?: number;
}

const SummaryScriptsSkeleton = ({ itemCount = 3 }: SummaryScriptsSkeletonProps) => {
  const lang = useGlobalLangState();

  return (
    <section>
      <header className={styles.header}>
        <h3 className={styles.head}>{metaData.head[lang]}</h3>
      </header>
      {Array.from({ length: itemCount }, (_, lineNo) => (
        <SummaryScriptSkeleton key={lineNo} />
      ))}
    </section>
  );
};
export default SummaryScriptsSkeleton;
