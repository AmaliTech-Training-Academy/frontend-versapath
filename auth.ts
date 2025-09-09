import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Roles } from "./lib/types";

declare module "next-auth" {
    interface Session {
        user: {
            userId: string;
            username: string;
            email: string;
            role: Roles;
        } & DefaultSession["user"]
    }

    interface User {
        userId: string;
        username: string;
        email: string;
        role: Roles;
    }

    interface JWT {
        userId: string;
        username: string;
        email: string;
        role: Roles;
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
                const { user } = credentials as {
                    user: string
                }
                return JSON.parse(user);
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
                token.userId = user.userId;
                token.email = user.email;
                token.username = user.username;
                token.role = user.role;
            }
            return token
        },
        async session({ session, token }) {
            if (token && token?.userId) {
                session.user = {
                    ...session.user,
                    id: token.userId as string,
                    email: token.email as string,
                    username: token.username as string,
                    role: token.role as Roles
                }
            }
            return session;
        }
    },
    secret: process.env.AUTH_SECRET
})