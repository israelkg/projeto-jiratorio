import { create } from "zustand";

const QUESTION_TOTAL = 12;

const initialState = {
  roundNumber: 1,
  inquisitorId: null,
  victimId: null,
  questionId: null,
  questionsUsed: [],
  questionsTotal: QUESTION_TOTAL,
  timer: 30,
  timerInitial: 30,
  timerRunning: false,
  result: null, // null | "correct" | "wrong"
  history: [],
  showAnswer: false,
};

export const useRoundStore = create((set) => ({
  ...initialState,

  setRoles: (inquisitorId, victimId) =>
    set({ inquisitorId, victimId }),

  setQuestion: (questionId) =>
    set((s) => ({
      questionId,
      questionsUsed: s.questionsUsed.includes(questionId)
        ? s.questionsUsed
        : [...s.questionsUsed, questionId],
    })),

  setTimerInitial: (seconds) => set({ timer: seconds, timerInitial: seconds }),

  startTimer: () => set({ timerRunning: true }),
  pauseTimer: () => set({ timerRunning: false }),
  resetTimer: () => set((s) => ({ timer: s.timerInitial, timerRunning: false })),
  tickTimer: () =>
    set((s) => {
      if (!s.timerRunning) return {};
      const next = Math.max(0, s.timer - 1);
      if (next === 0) return { timer: 0, timerRunning: false };
      return { timer: next };
    }),
  addTime: (seconds) =>
    set((s) => ({ timer: Math.min(999, s.timer + seconds) })),

  setResult: (result) => set({ result, timerRunning: false }),

  addHistory: (entry) =>
    set((s) => ({ history: [...s.history, { id: Date.now(), ...entry }] })),

  toggleAnswer: () => set((s) => ({ showAnswer: !s.showAnswer })),

  nextRound: () =>
    set((s) => ({
      roundNumber: s.roundNumber + 1,
      inquisitorId: null,
      victimId: null,
      questionId: null,
      timer: s.timerInitial,
      timerRunning: false,
      result: null,
      showAnswer: false,
    })),

  reset: () => set(initialState),

  swapRoles: () =>
    set((s) => ({ inquisitorId: s.victimId, victimId: s.inquisitorId })),

  setVictim: (victimId) => set({ victimId, result: null, showAnswer: false }),
}));
