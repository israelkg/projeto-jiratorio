import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Email inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Nome obrigatório").max(120),
    email: z.string().trim().toLowerCase().email("Email inválido"),
    password: z.string().min(8, "Senha precisa ter ao menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["user", "admin"]),
});

export const authPayloadSchema = z.object({
  token: z.string(),
  user: userSchema,
});
