import { FormEventHandler, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import { PropsWithClassName } from '../../../types/utils';
import classNames from '../../../utils/classNames';
import IconButton from '../../atoms/IconButton';
import Input from '../../atoms/Input';
import * as styles from './styles.css';

interface SearchFormProps extends PropsWithClassName {
  defaultValue?: string;
  placeholder?: string;
  onSubmit?: (value: string) => void;
}

const SearchForm = ({ className, defaultValue = '', placeholder, onSubmit }: SearchFormProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    onSubmit?.(value);
  };

  return (
    <form className={classNames(styles.form, className)} onSubmit={handleSubmit}>
      <Input
        className={styles.input}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <IconButton className={styles.button} type="submit" icon={<AiOutlineSearch />} />
    </form>
  );
};

export default SearchForm;
