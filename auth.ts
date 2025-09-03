import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Roles } from "./lib/types";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            fullName: string;
            email: string;
            role: Roles;
            accessToken: string;
        } & DefaultSession["user"]
    }

    interface User {
        id: string;
        username: string;
        fullName: string;
        email: string;
        role: Roles;
        accessToken: string;
    }

    interface JWT {
        id: string;
        username: string;
        fullName: string;
        email: string;
        role: Roles;
        accessToken: string;
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
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.fullName = user.fullName;
                token.role = user.role;
                token.accessToken = user.accessToken;
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
                    role: token.role as Roles,
                    accessToken: token.accessToken as string
                }
            }
            return session;
        }
    },
    secret: process.env.AUTH_SECRET
})