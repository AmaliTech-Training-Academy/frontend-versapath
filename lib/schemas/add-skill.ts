import { z } from "zod";

export const addSkillSchema = z.object({
  name: z
    .string({ error: "Skill name is required" })
    .min(4, "Skill name must be at least 4 characters long"),
  description: z
    .string({ error: "Description is required" })
    .min(10, "Description must be at least 10 characters long"),
  category: z.string().min(1, { error: "Category is required" }),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"], {
    error: "Select a difficulty level",
  }),
  estimatedHours: z
    .string({ error: "Estimated hours is required" })
    .regex(/^\d+$/, "Estimated hours must be a number"),
  tags: z.array(z.string()),
  cover: z
    .file()
    .max(1_000_000)
    .mime(["image/png", "image/jpeg", "image/webp"])
    .optional(),
});
export type AddSkillSchemaProps = z.infer<typeof addSkillSchema>;
