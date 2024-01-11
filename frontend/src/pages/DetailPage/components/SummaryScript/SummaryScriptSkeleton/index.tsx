import paperclipIcon from '../../../../../assets/paperclip.png';
import * as styles from './styles.css';

interface SummaryScriptSkeletonProps {
  itemCount?: number;
}

const SummaryScriptSkeleton = ({ itemCount = 3 }: SummaryScriptSkeletonProps) => (
  <article className={styles.container}>
    <header className={styles.header}>
      <img className={styles.icon} src={paperclipIcon} alt="change highlight" />
      <div className={styles.head} />
    </header>
    <div className={styles.unorderedList}>
      {Array.from({ length: itemCount }, (_, lineNo) => (
        <div key={lineNo} className={styles.listItem}>
          <div className={styles.line} />
          <div className={styles.line} />
        </div>
      ))}
    </div>
  </article>
);

export default SummaryScriptSkeleton;
