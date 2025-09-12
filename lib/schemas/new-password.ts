import { z } from "zod";

export const createPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, "Must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z
      .string()
      .nonempty({ message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Both passwords must match",
    path: ["confirmPassword"],
  });

export type CreatePasswordForm = z.infer<typeof createPasswordSchema>;
