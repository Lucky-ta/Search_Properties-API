import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6),
});

export const ediUserSchema = z.object({
    name: z.string().min(3).max(20).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
});
