import { z } from "zod";
export const addGrowthTracksSchema = z.object({
  name: z
    .string("Name is invalid")
    .nonempty("Name is required")
    .min(3, "Name must have at least 3 characters")
    .regex(/^[A-Za-z ]+$/, "Name cannot contain numbers"),
  estimatedMonths: z
    .number({
      error: "Estimated hours must be a number",
    })
    .min(1, "Estimated months must be at least 1")
    .max(36, "Estimated hours must not exceed 36"),
  description: z.string("Description is invalid").optional(),
  capsuleIds: z.array(z.string()).optional(),
  image: z
    .file()
    .max(1_000_000)
    .mime(["image/png", "image/jpeg", "image/webp"])
    .optional(),
});

export type AddGrowthTracksProps = z.infer<typeof addGrowthTracksSchema>;
