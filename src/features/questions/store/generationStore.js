import { create } from "zustand";

export const useGenerationStore = create((set) => ({
  request: null,
  result: null,
  setRequest: (request) => set({ request, result: null }),
  setResult: (result) => set({ result }),
  clear: () => set({ request: null, result: null }),
}));
