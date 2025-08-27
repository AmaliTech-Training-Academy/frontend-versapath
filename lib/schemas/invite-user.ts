import { z } from "zod";
export const inviteUserSchema = z.object({
  email: z.email("Invalid email format").nonempty("Email is required"),
  role: z.string().nonempty("Role is required"),
});
export type InviteUserInputs = z.infer<typeof inviteUserSchema>;
