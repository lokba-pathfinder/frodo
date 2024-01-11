import useGlobalLangState from '../../../../hooks/useGlobalLangState';
import { Contents, SummaryScriptContent } from '../../../../types/detail';
import Similarity from '../Similarity';
import * as styles from './styles.css';

interface SimilarityScriptProps {
  contents: Contents<SummaryScriptContent>;
  grade: 'high' | 'medium' | 'low';
  score: number;
}

const SimilarityScript = ({ contents, grade, score }: SimilarityScriptProps) => {
  const lang = useGlobalLangState();

  const { title, lines } = contents[lang];

  return (
    <div>
      <Similarity grade={grade} score={score} />
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <ul className={styles.descriptions}>
        {lines.map((description, lineNo) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={lineNo} className={styles.description}>
            {description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimilarityScript;
