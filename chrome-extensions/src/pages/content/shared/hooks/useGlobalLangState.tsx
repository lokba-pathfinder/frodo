import { useContext } from 'react';
import { LangStateContext } from '../provider/LangProvider';

const useGlobalLangState = () => {
  const langState = useContext(LangStateContext);

  return langState;
};

export default useGlobalLangState;
