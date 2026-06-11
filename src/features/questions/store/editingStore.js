import { create } from "zustand";

export const useEditingQuestionStore = create((set) => ({
  question: null,
  setQuestion: (question) => set({ question }),
  clear: () => set({ question: null }),
}));
