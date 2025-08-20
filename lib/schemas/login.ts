import { z } from 'zod';

export const loginSchema = z.object ({
    email: z.string().nonempty('Email required').email(),
    password: z.string().nonempty('Password required')
});

export type loginInputs = z.infer<typeof loginSchema>;