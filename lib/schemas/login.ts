import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address").nonempty("Email required"),
  password: z.string().nonempty("Password required"),
});

export type loginInputs = z.infer<typeof loginSchema>;
