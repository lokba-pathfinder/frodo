import { ButtonHTMLAttributes } from 'react';

import classNames from '../../../utils/classNames';
import * as styles from './styles.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
}

const IconButton = ({ className, icon, ...props }: IconButtonProps) => (
  <button type="button" className={classNames(styles.button, className)} {...props}>
    {icon}
  </button>
);

export default IconButton;
