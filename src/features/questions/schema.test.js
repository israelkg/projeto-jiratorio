import { describe, it, expect } from "vitest";
import {
  questionSchema,
  editQuestionSchema,
  generateQuestionsParamsSchema,
} from "./schema";

describe("questionSchema", () => {
  it("aceita pergunta válida", () => {
    const result = questionSchema.safeParse({
      id: 1,
      text: "Qual é o maior planeta?",
    });
    expect(result.success).toBe(true);
  });

  it("rejeita pergunta com texto curto", () => {
    const r = questionSchema.safeParse({ id: 1, text: "abc" });
    expect(r.success).toBe(false);
  });

  it("rejeita id inválido", () => {
    expect(questionSchema.safeParse({ id: -1, text: "Pergunta válida aqui" }).success).toBe(false);
    expect(questionSchema.safeParse({ id: 0, text: "Pergunta válida aqui" }).success).toBe(false);
  });
});

describe("editQuestionSchema", () => {
  it("pega só id + text", () => {
    const r = editQuestionSchema.parse({ id: 1, text: "Pergunta editada com texto suficiente" });
    expect(r).toEqual({ id: 1, text: "Pergunta editada com texto suficiente" });
  });
});

describe("generateQuestionsParamsSchema", () => {
  it("aceita params válidos", () => {
    const r = generateQuestionsParamsSchema.safeParse({
      quantity: 30,
      difficulty: "medio",
      types: { multipla: true, verdadeiro: false, dissertativa: false },
    });
    expect(r.success).toBe(true);
  });

  it("rejeita quando nenhum tipo selecionado", () => {
    const r = generateQuestionsParamsSchema.safeParse({
      quantity: 30,
      difficulty: "medio",
      types: { multipla: false, verdadeiro: false, dissertativa: false },
    });
    expect(r.success).toBe(false);
  });

  it("rejeita quantidade fora do range", () => {
    expect(generateQuestionsParamsSchema.safeParse({
      quantity: 4,
      difficulty: "facil",
      types: { multipla: true, verdadeiro: false, dissertativa: false },
    }).success).toBe(false);

    expect(generateQuestionsParamsSchema.safeParse({
      quantity: 101,
      difficulty: "facil",
      types: { multipla: true, verdadeiro: false, dissertativa: false },
    }).success).toBe(false);
  });
});
