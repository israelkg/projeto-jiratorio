import { z } from "zod";

export const questionTypeSchema = z.enum(["multipla", "verdadeiro", "dissertativa"]);
export const difficultySchema = z.enum(["facil", "medio", "dificil"]);

export const questionSchema = z.object({
  id: z.number().int().positive(),
  text: z.string().trim().min(5, "Pergunta deve ter ao menos 5 caracteres").max(500, "Máximo 500 caracteres"),
  type: questionTypeSchema.optional(),
  difficulty: difficultySchema.optional(),
  answer: z.string().optional(),
  active: z.boolean().default(true),
});

export const editQuestionSchema = questionSchema.pick({
  id: true,
  text: true,
});

export const generateQuestionsParamsSchema = z.object({
  quantity: z.number().int().min(5).max(100),
  difficulty: difficultySchema,
  types: z.object({
    multipla: z.boolean(),
    verdadeiro: z.boolean(),
    dissertativa: z.boolean(),
  }).refine((t) => t.multipla || t.verdadeiro || t.dissertativa, {
    message: "Selecione ao menos um tipo de pergunta",
  }),
});
