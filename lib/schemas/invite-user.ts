import { z } from "zod";
export const inviteUserSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  role: z.string().nonempty("Role is required"),
});
export type InviteUserInputs = z.infer<typeof inviteUserSchema>;
