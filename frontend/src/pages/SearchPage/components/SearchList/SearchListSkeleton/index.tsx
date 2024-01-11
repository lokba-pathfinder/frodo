import SearchItemSkeleton from '../../SearchItem/SearchItemSkeleton';
import * as styles from './styles.css';

interface SearchListSkeletonProps {
  itemCount?: number;
}

const SearchListSkeleton = ({ itemCount = 10 }: SearchListSkeletonProps) => (
  <div className={styles.container}>
    <header className={styles.header}>
      <div className={styles.title} />
      <div className={styles.description} />
    </header>
    <ul className={styles.searchList}>
      {Array.from({ length: itemCount }, (_, index) => (
        <SearchItemSkeleton key={index} />
      ))}
    </ul>
  </div>
);

export default SearchListSkeleton;
