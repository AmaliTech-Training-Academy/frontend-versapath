import { z } from "zod";
import { DifficultyLevels, ProfficiencyLevels } from "../types";
import { error } from "console";

export const addSkillSchema = z.object({
  name: z
    .string({ error: "Skill name is required" })
    .min(4, "Skill name must be at least 4 characters long"),
  description: z
    .string({ error: "Description is required" })
    .min(10, "Description must be at least 10 characters long"),
  objectives: z
    .string({ error: "Objectives are required" })
    .min(10, "Objectives must be at least 10 characters long"),
  proficiencyLevel: z.enum(ProfficiencyLevels, {
    error: "Select a proficiency level",
  }),
  categories: z
    .array(z.string(), "At least one category is required")
    .min(1, "At least one category is required"),
  difficulty: z.enum(DifficultyLevels, {
    error: "Select a difficulty level",
  }),
  estimatedHours: z
    .string({ error: "Estimated hours is required" })
    .regex(/^\d+$/, "Estimated hours must be a number"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  cover: z
    .file()
    .max(1_000_000, { error: "Max file size is 1MB." })
    .mime(["image/png", "image/jpeg", "image/webp"])
    .optional(),
});
export type AddSkillSchemaProps = z.infer<typeof addSkillSchema>;
