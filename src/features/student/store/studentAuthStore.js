import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const STUDENT_TOKEN_KEY = "student_token";

function readToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STUDENT_TOKEN_KEY);
}

export const useStudentAuthStore = create(
  persist(
    (set) => ({
      token: readToken(),
      student: null,
      session: null,

      setSession: ({ token, student, session }) => {
        if (typeof window !== "undefined") localStorage.setItem(STUDENT_TOKEN_KEY, token);
        set({ token, student, session });
      },

      clear: () => {
        if (typeof window !== "undefined") localStorage.removeItem(STUDENT_TOKEN_KEY);
        set({ token: null, student: null, session: null });
      },
    }),
    {
      name: "student_auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ student: s.student, session: s.session }),
    },
  ),
);

export const selectStudentLogged = (s) => Boolean(s.token);
