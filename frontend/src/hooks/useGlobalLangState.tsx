import useLangStore from '../store/useLangStore';

const useGlobalLangState = () => {
  const lang = useLangStore((store) => store.lang);

  return lang;
};

export default useGlobalLangState;
