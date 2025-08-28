import z from "zod";

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;