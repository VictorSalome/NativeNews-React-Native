import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z
    .string()
    .min(6, { message: "Mínimo 6 caracteres" })
    .regex(/.*[A-Z].*/, { message: "Senha deve conter pelo menos uma letra maiúscula" })
    .regex(/.*[0-9].*/, { message: "Senha deve conter pelo menos um número" })
    .regex(/.*[!@#$%^&*(),.?":{}|<>].*/, {
      message: "Senha deve conter pelo menos um caractere especial",
    }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
