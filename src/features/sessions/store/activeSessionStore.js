import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useActiveSessionStore = create(
  persist(
    (set) => ({
      sessionId: null,
      sessionName: null,
      joinCode: null,
      students: [],
      currentRoundId: null,
      lastDraw: null,

      setSession: ({ id, name, joinCode, students }) =>
        set({
          sessionId: id,
          sessionName: name,
          joinCode: joinCode ?? null,
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
          joinCode: null,
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
