import { create } from 'zustand';

interface PlayTimeState {
  playTime: number;
}

interface PlayTimeActions {
  setPlayTime: (playTime: number) => void;
  resetPlayTime: () => void;
}

export const initialPlayTime = 0;

const usePlayTimeStore = create<PlayTimeState & PlayTimeActions>((set) => ({
  playTime: initialPlayTime,
  setPlayTime: (playTime) => set({ playTime }),
  resetPlayTime: () => set({ playTime: initialPlayTime }),
}));

export default usePlayTimeStore;
