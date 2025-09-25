import { z } from "zod";
import { DifficultyLevels, ProfficiencyLevels } from "../types";

export const addSkillSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(3, "Skill name must have at least 3 characters")
    .regex(/^[A-Za-z ]+$/, "Name cannot contain numbers"),
  description: z.string({ error: "Description is required" }).optional(),
  objectives: z.string({ error: "Objectives are required" }).optional(),
  proficiencyLevel: z.enum(ProfficiencyLevels, {
    error: "Select a proficiency level",
  }),
  categories: z
    .array(z.string(), "At least one category is required")
    .optional(),
  difficulty: z
    .enum(DifficultyLevels, {
      error: "Select a difficulty level",
    })
    .optional(),
  estimatedHours: z
    .number({
      error: "Estimated hours must be a number",
    })
    .min(1, "Estimated hours must be at least 1")
    .max(1000, "Estimated hours must not exceed 1000"),
  tags: z.array(z.string()).optional(),
  cover: z
    .file()
    .max(1_000_000, { error: "Max file size is 1MB." })
    .mime(["image/png", "image/jpeg", "image/webp"])
    .optional(),
});

export type AddSkillSchemaProps = z.infer<typeof addSkillSchema>;
