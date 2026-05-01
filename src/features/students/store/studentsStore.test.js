import { describe, it, expect, beforeEach } from "vitest";
import { useStudentsStore } from "./studentsStore";

describe("studentsStore", () => {
  let initialSnapshot;

  beforeEach(() => {
    if (!initialSnapshot) initialSnapshot = useStudentsStore.getState().students.map((s) => ({ ...s, inventory: [...s.inventory] }));
    useStudentsStore.setState({ students: initialSnapshot.map((s) => ({ ...s, inventory: [...s.inventory] })) });
  });

  it("addPoints incrementa pontuação do aluno", () => {
    const before = useStudentsStore.getState().students.find((s) => s.id === 1).points;
    useStudentsStore.getState().addPoints(1, 3);
    expect(useStudentsStore.getState().students.find((s) => s.id === 1).points).toBe(before + 3);
  });

  it("addPoints com delta negativo não passa de 0", () => {
    useStudentsStore.getState().addPoints(1, -9999);
    expect(useStudentsStore.getState().students.find((s) => s.id === 1).points).toBe(0);
  });

  it("givePowerUp adiciona ao inventário", () => {
    useStudentsStore.getState().givePowerUp(1, "dica");
    expect(useStudentsStore.getState().students.find((s) => s.id === 1).inventory).toContain("dica");
  });

  it("consumePowerUp remove apenas 1 instância", () => {
    useStudentsStore.getState().givePowerUp(1, "dica");
    useStudentsStore.getState().givePowerUp(1, "dica");
    useStudentsStore.getState().consumePowerUp(1, "dica");
    const inv = useStudentsStore.getState().students.find((s) => s.id === 1).inventory;
    expect(inv.filter((p) => p === "dica")).toHaveLength(1);
  });

  it("consumePowerUp ignora se não tem o item", () => {
    const before = useStudentsStore.getState().students.find((s) => s.id === 1).inventory.length;
    useStudentsStore.getState().consumePowerUp(1, "inexistente");
    expect(useStudentsStore.getState().students.find((s) => s.id === 1).inventory).toHaveLength(before);
  });

  it("incrementVictimCount aumenta contador", () => {
    const before = useStudentsStore.getState().students.find((s) => s.id === 1).victimCount;
    useStudentsStore.getState().incrementVictimCount(1);
    expect(useStudentsStore.getState().students.find((s) => s.id === 1).victimCount).toBe(before + 1);
  });
});
