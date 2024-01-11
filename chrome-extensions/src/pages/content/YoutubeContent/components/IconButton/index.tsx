import { MouseEventHandler } from 'react';

interface IconButtonProps {
  iconSrc: string;
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
}

const IconButton = ({ iconSrc, text, onClick, active = false }: IconButtonProps) => (
  <button
    type="button"
    className={active ? 'youtube-content__icon-button--active' : 'youtube-content__icon-button'}
    onClick={onClick}
  >
    <img src={iconSrc} alt="" />
    {text}
  </button>
);

export default IconButton;
