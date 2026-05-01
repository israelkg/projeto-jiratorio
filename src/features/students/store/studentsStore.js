import { create } from "zustand";

const DEMO_STUDENTS = [
  { id: 1, name: "FULANO 1", points: 14, victimCount: 2, inventory: [] },
  { id: 2, name: "FULANO 2", points: 11, victimCount: 1, inventory: ["dica"] },
  { id: 3, name: "FULANO 3", points: 9,  victimCount: 0, inventory: ["tempo"] },
  { id: 4, name: "FULANO 4", points: 7,  victimCount: 3, inventory: [] },
  { id: 5, name: "FULANO 5", points: 4,  victimCount: 1, inventory: ["escudo", "dobro"] },
  { id: 6, name: "FULANO 6", points: 6,  victimCount: 2, inventory: [] },
  { id: 7, name: "FULANO 7", points: 8,  victimCount: 1, inventory: ["troca"] },
];

export const useStudentsStore = create((set) => ({
  students: DEMO_STUDENTS,

  addPoints: (id, delta) =>
    set((s) => ({
      students: s.students.map((st) =>
        st.id === id ? { ...st, points: Math.max(0, st.points + delta) } : st,
      ),
    })),

  givePowerUp: (id, powerUpId) =>
    set((s) => ({
      students: s.students.map((st) =>
        st.id === id ? { ...st, inventory: [...st.inventory, powerUpId] } : st,
      ),
    })),

  consumePowerUp: (id, powerUpId) =>
    set((s) => ({
      students: s.students.map((st) => {
        if (st.id !== id) return st;
        const idx = st.inventory.indexOf(powerUpId);
        if (idx < 0) return st;
        return { ...st, inventory: st.inventory.filter((_, i) => i !== idx) };
      }),
    })),

  incrementVictimCount: (id) =>
    set((s) => ({
      students: s.students.map((st) =>
        st.id === id ? { ...st, victimCount: st.victimCount + 1 } : st,
      ),
    })),
}));
