import z from "zod";

export const SkillAtomSchema = z.object({
  lessonName: z.string().min(20, { message: "Lesson name is required." }),
  description: z.string().optional(),
  objectives: z.string().optional(),
  moodleUrl: z.string().url({ message: "Must be a valid URL" }).optional(),
  type: z.string().min(1, { message: "Lesson type is required." }),
  hours: z.number().min(1, { message: "Hours must be at least 1" }),
  status: z.enum(["draft", "publish"], {
    error: "Please select a status.",
  }),
});

export type SkillAtomFormValues = z.infer<typeof SkillAtomSchema>;
