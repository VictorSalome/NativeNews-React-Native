import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
});

export type IForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
