import { useContext } from 'react';
import { LangActionContext } from '../provider/LangProvider';

const useGlobalLangAction = () => {
  const langAction = useContext(LangActionContext);

  return langAction;
};

export default useGlobalLangAction;
