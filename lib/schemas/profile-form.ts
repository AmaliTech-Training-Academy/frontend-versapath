import { z } from "zod";

export const profileFormSchema = z.object({
    firstName: z.string('First name is required').min(2, 'First name must be at least 2 characters'),
    lastName: z.string('Last name is required').min(2, 'Last name must be at least 2 characters'),
    userName: z.string('Username is required').min(2, 'username must be at least 2 characters'),
    image: z.file().mime(["image/jpeg","image/png"]).optional(),
    phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/, "Phone must be valid (e.g. +250788123456)").optional()
  })

export type ProfileSchema = z.infer<typeof profileFormSchema>;
