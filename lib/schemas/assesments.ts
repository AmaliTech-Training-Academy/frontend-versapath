import { z } from "zod";
export const assessmentSchema = z.object({
  assessmentName: z
    .string("Assessment name is required")
    .regex(
      /^[A-Za-z0-9 ]+$/,
      "Assessment name cannot contain special characters"
    )
    .min(3, "Assessment name must be at least 3 characters"),
  skillName: z
    .string("Skill name is required")
    .min(2, "Skill name must be at least 2 characters")
    .max(50, "Skill name must be at most 50 characters"),
  assessmentType: z.string("Assesment is required"),
  maxAttempts: z
    .number("Max attempts must be a number")
    .min(1, "Max attempts must be at least 1")
    .max(1000, "Max attempts must not exceed 1000"),
  passingScore: z
    .number("Passing score must be a number")
    .min(1, "Passing score must be at least 1")
    .max(1000, "Passing score must not exceed 1000"),
  timeLimitMinutes: z
    .number("Time limit must be a number")
    .min(1, "Time limit must be at least 1 minute")
    .max(1000, "Time limit must not exceed 1000 minutes"),
  instructions: z
    .string()
    .max(500, "Instructions must be at most 500 characters"),
});

export type AssessmentSchemaProps = z.infer<typeof assessmentSchema>;
