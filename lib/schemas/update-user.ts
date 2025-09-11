import { z } from "zod";

export const updateUserSchema = z.object({
  fullName: z.string(),
  username: z.string(),
  role: z.string({ error: "Roles is required" }),
  status: z.string({ error: "Status is required" }),
  phoneNumber: z.string().optional(),
  email: z.email("Invalid email format"),
  manager: z.string().optional(),
  mentor: z.string().optional(),
});
export type UpdateUserProps = z.infer<typeof updateUserSchema>;

export const upddateUserStatusSchema = z.object({
  status: z.string().nonempty("Status is required"),
});
export type UpdateUserStatusProps = z.infer<typeof upddateUserStatusSchema>;
export const updateUserRoleSchema = z.object({
  role: z.string().nonempty("Role is required"),
});
export type UpdateUserRoleProps = z.infer<typeof updateUserRoleSchema>;
