import { InputHTMLAttributes } from 'react';

import classNames from '../../../utils/classNames';
import * as styles from './styles.css';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...props }: InputProps) => (
  <input className={classNames(styles.input, className)} {...props} />
);

export default Input;
