import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({ message: "Email hatalı." }
    ),
    password: z.string().min(1, { message: "Şifre boş olamaz." })
});