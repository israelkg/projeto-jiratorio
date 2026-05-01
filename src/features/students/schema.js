import { z } from "zod";

export const studentSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().trim().min(1, "Nome obrigatório").max(80),
  points: z.number().default(0),
  victimCount: z.number().int().nonnegative().default(0),
  inventory: z.array(z.string()).default([]),
});

/** CSV row → student */
export const studentCsvRowSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().trim().min(1),
});

export const studentsCsvSchema = z.array(studentCsvRowSchema).min(1, "Importe ao menos 1 aluno");
