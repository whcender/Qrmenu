"use server";

import { LoginSchema } from '@/schemas';
import * as z from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { getUserByEmail } from '@/data/user';

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null,) => {
    const validatedFileds = LoginSchema.safeParse(values);

    if (!validatedFileds.success) {
        return { error: "Hatalı değerler!" };
    }

    const { email, password } = validatedFileds.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.password || !existingUser.email) {
        return { error: "Email kayıtlı değil!" }
    }


    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Email veya şifre hatalı!" }
                default:
                    return { error: "Bir hata oluştu!" }
            }
        }

        throw error;
    }
}