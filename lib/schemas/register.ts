import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email(),
    fullName: z
      .string("Names are required")
      .nonempty("Full Name is required")
      .min(4, "Full Name must be at least 4 characters long"),
    password: z
      .string({ error: "Password is required" })
      .nonempty("Password is required")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/, {
        error:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number",
      }),
    confirmPassword: z.string("Required"),
    username: z
      .string({ error: "Username is required" })
      .min(3, "Username is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords must match",
    path: ["confirmPassword"],
  });
export type RegisterInputs = z.infer<typeof registerSchema>;
