import { create } from 'zustand';

interface HighlightState {
  fullScriptIds: string[];
  summaryScriptId: string;
  startTime: number;
}

interface HighlightActions {
  setFullScriptIds: (fullScriptIds: string[]) => void;
  setSummaryScriptId: (summaryScriptId: string) => void;
  setHighlightState: (highlightState: HighlightState) => void;
  resetHighlightState: () => void;
}

export const initialHighlightState: HighlightState = {
  fullScriptIds: [],
  summaryScriptId: '',
  startTime: 0,
};

const useHighlightStore = create<HighlightState & HighlightActions>((set) => ({
  ...initialHighlightState,
  setFullScriptIds: (fullScriptIds) =>
    set((state) => ({ ...state, fullScriptIds: [...fullScriptIds] })),
  setSummaryScriptId: (summaryScriptId) => set((state) => ({ ...state, summaryScriptId })),
  setHighlightState: (highlightState) => set((state) => ({ ...state, ...highlightState })),
  resetHighlightState: () => set(() => ({ ...initialHighlightState })),
}));

export default useHighlightStore;
