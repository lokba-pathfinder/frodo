import globe from '@assets/globe.png';
import useGlobalLangState from '../../hooks/useGlobalLangState';
import useGlobalLangAction from '../../hooks/useGlobalLangAction';

const LangSwitchButton = () => {
  const lang = useGlobalLangState();
  const { setGlobalLang } = useGlobalLangAction();

  const handleClickButton = () => {
    setGlobalLang(lang === 'en' ? 'ko' : 'en');
  };

  return (
    <button type="button" className="lang-switch-button" onClick={handleClickButton}>
      <img src={globe} alt="globe" className="lang-switch-button-globe" />
      <div className={lang === 'ko' ? 'kor-active' : 'kor'}>
        <p className="lang-switch-button-text">KOR</p>
      </div>
      <div className="lang-switch-button-divider">|</div>
      <div className={lang === 'en' ? 'eng-active' : 'eng'}>
        <p className="lang-switch-button-text">ENG</p>
      </div>
    </button>
  );
};

export default LangSwitchButton;
