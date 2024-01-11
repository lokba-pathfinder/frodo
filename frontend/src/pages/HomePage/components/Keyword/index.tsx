import { PropsWithClassName } from '../../../../types/utils';
import classNames from '../../../../utils/classNames';
import * as styles from './style.css';

interface KeywordProps extends PropsWithClassName {
  text: string;
}

const Keyword = ({ text, className }: KeywordProps) => (
  <div className={classNames(styles.keyword, className)}>{text}</div>
);

export default Keyword;
