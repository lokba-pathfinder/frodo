import { DEFAULT_LANG } from '@src/configs/constants';
import { MESSAGE } from '@src/configs/messages';
import { Lang as LangState } from '@src/configs/types';
import { createContext, useEffect, useMemo, useState } from 'react';

interface LangAction {
  setGlobalLang: (value: LangState) => void;
}

type LangProviderProps = React.PropsWithChildren;

export const LangStateContext = createContext<LangState | null>(null);
export const LangActionContext = createContext<LangAction | null>(null);

const isLangStateType = (value: unknown): value is LangState =>
  typeof value === 'string' && ['en', 'ko'].includes(value);

const LangProvider = ({ children }: LangProviderProps) => {
  const [lang, setLang] = useState<LangState>(DEFAULT_LANG);

  const state = lang;
  const action = useMemo(
    () => ({
      setGlobalLang: (value: LangState) => {
        chrome.runtime.sendMessage(
          {
            message: MESSAGE.SET_STORED_LANG,
            payload: { lang: value },
          },
          (res) => {
            if (!isLangStateType(res)) return;
            setLang(res);
          },
        );
      },
    }),
    [],
  );

  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        message: MESSAGE.GET_STORED_LANG,
      },
      (res) => {
        if (!isLangStateType(res)) return;
        setLang(res);
      },
    );
  }, []);

  return (
    <LangStateContext.Provider value={state}>
      <LangActionContext.Provider value={action}>{children}</LangActionContext.Provider>
    </LangStateContext.Provider>
  );
};

export default LangProvider;
