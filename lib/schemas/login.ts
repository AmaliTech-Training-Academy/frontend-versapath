import * as z from 'zod';

export const loginSchema = z.object ({
    email: z.email(),
    password: z.string()
});

export type loginInputs = z.infer<typeof loginSchema>;