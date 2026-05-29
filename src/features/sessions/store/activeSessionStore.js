import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useActiveSessionStore = create(
  persist(
    (set) => ({
      sessionId: null,
      sessionName: null,
      students: [],
      currentRoundId: null,
      lastDraw: null,

      setSession: ({ id, name, students }) =>
        set({
          sessionId: id,
          sessionName: name,
          students: students ?? [],
          currentRoundId: null,
          lastDraw: null,
        }),

      setStudents: (students) => set({ students }),

      setLastDraw: (draw) => set({ lastDraw: draw }),

      setCurrentRound: (id) => set({ currentRoundId: id }),

      clear: () =>
        set({
          sessionId: null,
          sessionName: null,
          students: [],
          currentRoundId: null,
          lastDraw: null,
        }),
    }),
    {
      name: "active_session",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
