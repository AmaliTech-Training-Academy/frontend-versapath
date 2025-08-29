import { z } from "zod";
export const addCategorySchema = z.object({
  name: z.string().nonempty("Category name is required"),
  description: z.string(),
  cover: z.file().max(1_000_000).mime(["image/png", "image/jpeg", "image/webp"])
});

export type AddCategoryInputs = z.infer<typeof addCategorySchema>;