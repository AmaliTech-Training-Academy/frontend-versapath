import { z } from "zod";
export const addTalentRouteSchema = z.object({
  name: z
    .string("Name is invalid")
    .nonempty("Name is required")
    .min(3, "Name must have at least 3 characters")
    .regex(/^[A-Za-z ]+$/, "Name cannot contain numbers"),
  roleName: z
    .string("Role name is invalid")
    .nonempty("Role name is required")
    .min(3, "Role name must have at least 3 characters")
    .regex(/^[A-Za-z ]+$/, "Role name cannot contain numbers"),
  description: z.string("Description is invalid").optional(),
  trackIds: z.array(z.string()).optional(),
  image: z
    .file()
    .max(1_000_000)
    .mime(["image/png", "image/jpeg", "image/webp"])
    .optional(),
});

export type AddTalentRouteProps = z.infer<typeof addTalentRouteSchema>;
