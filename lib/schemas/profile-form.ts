import { z } from "zod";

export const profileFormSchema = z.object({
    firstName: z.string('First name is required').min(2, 'First name must be at least 2 characters'),
    lastName: z.string('Last name is required').min(2, 'Last name must be at least 2 characters'),
    email: z.email(),
    phoneNumber: z.string().trim().regex(/^\+?[1-9]\d{1,14}$/, "Enter a valid phone number in international format (e.g., +14155552671)"),
    image: z.file().mime(["image/jpeg","image/png"])
  })

export type ProfileSchema = z.infer<typeof profileFormSchema>;
