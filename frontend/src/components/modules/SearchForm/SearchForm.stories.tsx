import SearchForm from './index';
import * as styles from './styles.css';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'modules/SearchForm',
  component: SearchForm,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof SearchForm>;

export default meta;

export const Sizes = () => (
  <div className={styles.container}>
    <SearchForm className={styles.lgFormStyle} placeholder="Search what you want." />
    <SearchForm className={styles.mdFormStyle} placeholder="Search what you want." />
    <SearchForm className={styles.smFormStyle} placeholder="Search what you want." />
  </div>
);
