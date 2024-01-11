import { Lang } from '../types/detail';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LangState {
  lang: Lang;
}

interface LangAction {
  setLang: (lang: Lang) => void;
}

const DEFAULT_LANG = 'en';

const useLangStore = create(
  persist<LangState & LangAction>(
    (set) => ({
      lang: DEFAULT_LANG,
      setLang: (lang) => set({ lang }),
    }),
    {
      name: 'lang-store',
    },
  ),
);

export default useLangStore;
