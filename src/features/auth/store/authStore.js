import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AUTH_TOKEN_KEY } from "@/lib/api";

const USER_STORAGE_KEY = "auth_user";

function readToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export const useAuthStore = create(
  persist(
    (set) => ({
      token: readToken(),
      user: null,

      setSession: ({ token, user }) => {
        if (typeof window !== "undefined") {
          localStorage.setItem(AUTH_TOKEN_KEY, token);
        }
        set({ token, user });
      },

      setUser: (user) => set({ user }),

      clear: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem(AUTH_TOKEN_KEY);
        }
        set({ token: null, user: null });
      },
    }),
    {
      name: USER_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ user: s.user }),
    },
  ),
);

export const selectIsAuthenticated = (s) => Boolean(s.token);
