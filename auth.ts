import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { apiLogin } from "./lib/api/login";
import { loginSchema } from "./lib/schemas/login";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            fullName: string;
            email: string;
            role: 'LEARNER' | 'MENTOR' | 'MANAGER' | 'ADMIN';
        } & DefaultSession["user"]
    }

    interface User {
        id: string;
        username: string;
        fullName: string;
        email: string;
        role: 'LEARNER' | 'MENTOR' | 'MANAGER' | 'ADMIN';
    }

    interface JWT {
        id: string;
        username: string;
        fullName: string;
        email: string;
        role: 'LEARNER' | 'MENTOR' | 'MANAGER' | 'ADMIN';
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                    placeholder: "johndoe@gmail.com"
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "******"
                }
            },
            authorize: async (credentials) => {
                const { email, password } = await loginSchema.parseAsync(credentials);
                const response = await apiLogin(email, password);

                if (response.errors) {
                    throw new Error(response.errors.message || "Email and password don't match, try again");
                }

                return response.data.user;
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.fullName = user.fullName;
                token.role = user.role;
            }
            return token
        },
        async session({ session, token }) {
            if (token && token?.id) {
                session.user = {
                    ...session.user,
                    id: token.id as string,
                    email: token.email as string,
                    fullName: token.fullName as string,
                    username: token.username as string,
                    role: token.role as 'LEARNER' | 'MENTOR' | 'MANAGER' | 'ADMIN'
                }
            }
            return session;
        }
    }
})