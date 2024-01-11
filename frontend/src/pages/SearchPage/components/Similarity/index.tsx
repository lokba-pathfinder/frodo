import useGlobalLangState from '../../../../hooks/useGlobalLangState';
import { Contents } from '../../../../types/detail';
import * as styles from './styles.css';

interface SimilarityScriptProps {
  grade: 'high' | 'medium' | 'low';
  score: number;
}

const metaData: { text: Contents<string> } = {
  text: { ko: '유사도', en: 'Similarity' },
};

const Similarity = ({ grade, score }: SimilarityScriptProps) => {
  const lang = useGlobalLangState();

  return (
    <div className={styles.similarity}>
      <div className={styles.circle[grade]} />
      <div className={styles.text}>
        {score}
        <span className={styles.threshold}>/100</span> {metaData.text[lang]}
      </div>
    </div>
  );
};

export default Similarity;
