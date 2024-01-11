import { PINNECT_AI_URL } from '@src/configs/constants';
import logo from '@assets/icon-32.png';
import LangSwitchButton from '../LangSwitchButton';

const Header = () => (
  <header className="pinnect-ai-header">
    <h1 className="pinnect-ai-title">
      <a href={PINNECT_AI_URL} target="_blank" rel="noreferrer">
        <img src={logo} alt="logo" />
        Pinnect.ai
      </a>
    </h1>
    <div>
      <LangSwitchButton />
    </div>
  </header>
);

export default Header;
