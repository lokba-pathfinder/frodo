import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';

import IconButton from '.';
import { vars } from '../../../styles/themes.css';
import * as styles from './styles.css';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'atoms/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: vars.colors.white }],
    },
  },
  argTypes: {},
} satisfies Meta<typeof IconButton>;

export default meta;

export const Default = () => (
  <div className={styles.container}>
    <IconButton className={styles.xsStyle} icon={<AiOutlineSearch />} />
    <h1>왼쪽에 마우스를 올려보세요 😄</h1>
  </div>
);

export const Search = () => (
  <div className={styles.container}>
    <IconButton className={styles.xlStyle} icon={<AiOutlineSearch />} />
    <IconButton className={styles.lgStyle} icon={<AiOutlineSearch />} />
    <IconButton className={styles.mdStyle} icon={<AiOutlineSearch />} />
    <IconButton className={styles.smStyle} icon={<AiOutlineSearch />} />
    <IconButton className={styles.xsStyle} icon={<AiOutlineSearch />} />
  </div>
);

export const Menu = () => (
  <div className={styles.container}>
    <IconButton className={styles.xlStyle} icon={<AiOutlineMenu />} />
    <IconButton className={styles.lgStyle} icon={<AiOutlineMenu />} />
    <IconButton className={styles.mdStyle} icon={<AiOutlineMenu />} />
    <IconButton className={styles.smStyle} icon={<AiOutlineMenu />} />
    <IconButton className={styles.xsStyle} icon={<AiOutlineMenu />} />
  </div>
);
