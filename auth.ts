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
            firstName: string;
            lastName: string;
        } & DefaultSession["user"]
    }

    interface User {
        userId: string;
        username: string;
        email: string;
        role: Roles;
        firstName: string;
        lastName: string;
    }

    interface JWT {
        userId: string;
        username: string;
        email: string;
        role: Roles;
        firstName: string;
        lastName: string;
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
                token.firstName = user.firstName;
                token.lastName = user.lastName;
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                if (token?.userId) {
                    session.user = {
                        ...session.user,
                        userId: token.userId as string,
                        email: token.email as string,
                        username: token.username as string,
                        firstName: token.firstName as string,
                        lastName: token.lastName as string,
                        role: token.role as Roles
                    }
                }
            }
            return session;
        }
    },
    secret: process.env.AUTH_SECRET
})