import { create } from "zustand";

const initialState = {
  roundNumber: 1,
  inquisitor: null,
  victim: null,
  selectedQuestion: null,
  currentRoundId: null,
  scoreboard: [],
  history: [],
  lastResult: null,
  lastPowerup: null,
};

export const useRoundFlowStore = create((set) => ({
  ...initialState,

  setRoles: ({ inquisitor, victim }) => set({ inquisitor, victim }),

  setVictim: (victim) => set({ victim, currentRoundId: null, lastResult: null }),

  setSelectedQuestion: (question) => set({ selectedQuestion: question }),

  setCurrentRound: (id) => set({ currentRoundId: id }),

  setScoreboard: (scoreboard) => set({ scoreboard: scoreboard ?? [] }),

  pushHistory: (entry) =>
    set((s) => ({ history: [...s.history, { id: s.history.length + 1, ...entry }] })),

  setLastResult: (lastResult) => set({ lastResult }),

  setLastPowerup: (lastPowerup) => set({ lastPowerup }),

  nextRound: () =>
    set((s) => ({
      roundNumber: s.roundNumber + 1,
      inquisitor: null,
      victim: null,
      selectedQuestion: null,
      currentRoundId: null,
      lastResult: null,
      lastPowerup: null,
    })),

  reset: () => set({ ...initialState }),
}));
