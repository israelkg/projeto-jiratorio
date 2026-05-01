import { describe, it, expect, vi } from "vitest";
import { pickRandom, pickWeighted } from "./random";

describe("pickRandom", () => {
  it("retorna undefined se array vazio", () => {
    expect(pickRandom([])).toBeUndefined();
    expect(pickRandom(undefined)).toBeUndefined();
    expect(pickRandom(null)).toBeUndefined();
  });

  it("retorna o único elemento se array tem 1 item", () => {
    expect(pickRandom([42])).toBe(42);
  });

  it("retorna sempre algum elemento do array", () => {
    const arr = [1, 2, 3, 4, 5];
    for (let i = 0; i < 50; i++) {
      expect(arr).toContain(pickRandom(arr));
    }
  });
});

describe("pickWeighted", () => {
  it("retorna undefined se array vazio", () => {
    expect(pickWeighted([])).toBeUndefined();
    expect(pickWeighted(undefined)).toBeUndefined();
  });

  it("retorna sempre um aluno do array", () => {
    const students = [
      { id: 1, victimCount: 0 },
      { id: 2, victimCount: 0 },
      { id: 3, victimCount: 0 },
    ];
    const ids = students.map((s) => s.id);
    for (let i = 0; i < 30; i++) {
      expect(ids).toContain(pickWeighted(students).id);
    }
  });

  it("aluno com victimCount alto tem peso menor", () => {
    // Math.random fixo em 0 → primeiro item ganha sempre por peso decrescente
    vi.spyOn(Math, "random").mockReturnValue(0);
    const students = [
      { id: 1, victimCount: 0 }, // peso 1.0
      { id: 2, victimCount: 5 }, // peso 0.1 (clamp)
    ];
    expect(pickWeighted(students).id).toBe(1);
    vi.restoreAllMocks();
  });

  it("victimCount undefined trata como 0", () => {
    const students = [{ id: 1 }, { id: 2 }];
    expect(students.map((s) => s.id)).toContain(pickWeighted(students).id);
  });
});
