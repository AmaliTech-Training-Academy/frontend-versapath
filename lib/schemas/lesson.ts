import * as z from "zod";

export const SkillAtomSchema = z.object({
  lessonName: z.string().min(5, { message: "Lesson name is required." }),
  description: z.string().optional(),
  objectives: z.string().optional(),
  moodleUrl: z.string().optional(),
  hours: z.string().min(1, { message: "Hours are required" }),
  status: z
    .enum(["draft", "publish"], {
      error: "Please select a status.",
    })
    .optional(),
});

export type SkillAtomFormValues = z.infer<typeof SkillAtomSchema>;
