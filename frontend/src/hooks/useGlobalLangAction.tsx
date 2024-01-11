import useLangStore from '../store/useLangStore';

const useGlobalLangAction = () => {
  const setLang = useLangStore((state) => state.setLang);

  return setLang;
};

export default useGlobalLangAction;
