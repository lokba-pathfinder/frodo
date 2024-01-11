import useGlobalLangState from '../../../../../hooks/useGlobalLangState';
import { Contents } from '../../../../../types/detail';
import * as styles from './styles.css';

interface EmptySearchListProps {
  query: string;
}

const metaData: {
  firstLine: Contents<string>;
  secondLine: Contents<string>;
} = {
  firstLine: {
    en: 'No search results for',
    ko: '',
  },
  secondLine: {
    en: '',
    ko: '검색결과가 없습니다.',
  },
};

const EmptySearchList = ({ query }: EmptySearchListProps) => {
  const lang = useGlobalLangState();

  return (
    <div className={styles.container}>
      <h2 className={styles.description}>
        {metaData.firstLine[lang]}
        <em className={styles.em}>&#34;{query}&#34;</em>
        {metaData.secondLine[lang]}
      </h2>
    </div>
  );
};

export default EmptySearchList;
