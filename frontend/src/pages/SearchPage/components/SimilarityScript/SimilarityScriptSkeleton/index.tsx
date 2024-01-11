import SimilaritySkeleton from '../../Similarity/SimilaritySkeleton';
import * as styles from './styles.css';

interface SimilarityScriptSkeletonProps {
  itemCount?: number;
}

const SimilarityScriptSkeleton = ({ itemCount = 5 }: SimilarityScriptSkeletonProps) => (
  <div>
    <SimilaritySkeleton />
    <div className={styles.titleWrapper}>
      <div className={styles.title} />
    </div>
    <div className={styles.descriptions}>
      {Array.from({ length: itemCount }, (_, index) => (
        <div key={index} className={styles.description} />
      ))}
    </div>
  </div>
);

export default SimilarityScriptSkeleton;
