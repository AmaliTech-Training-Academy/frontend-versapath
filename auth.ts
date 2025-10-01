import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Roles } from "./lib/types";

declare module "next-auth" {
    interface Session {
        user: {
            userId: string;
            email: string;
            firstName: string;
            lastName: string;
            username: string;
            phoneNumber?: string;
            profilePictureUrl?: string;
            role: Roles;
            requiresOnboarding?: boolean;
        } & DefaultSession["user"]
    }

    interface User {
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        username: string;
        phoneNumber?: string;
        profilePictureUrl?: string;
        role: Roles;
        requiresOnboarding?: boolean;
    }

    interface JWT {
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        username: string;
        phoneNumber?: string;
        profilePictureUrl?: string;
        role: Roles;
        requiresOnboarding?: boolean;
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
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.userId = user.userId;
                token.email = user.email;
                token.username = user.username;
                token.role = user.role;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.phoneNumber = user.phoneNumber;
                token.profilePictureUrl = user.profilePictureUrl;
                token.requiresOnboarding = user.requiresOnboarding;
            }

            if (trigger === "update") {
                if (session?.user) {
                    token.userId = session.user.userId;
                    token.email = session.user.email;
                    token.username = session.user.username;
                    token.role = session.user.role;
                    token.firstName = session.user.firstName;
                    token.lastName = session.user.lastName;
                    token.phoneNumber = session.user.phoneNumber;
                    token.requiresOnboarding = session.user.requiresOnboarding ?? token.requiresOnboarding;
                }
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
                        role: token.role as Roles,
                        phoneNumber: token.phoneNumber as string ?? undefined,
                        profilePictureUrl: token.profilePictureUrl as string ?? undefined,
                        requiresOnboarding: token.requiresOnboarding as boolean ?? undefined
                    }
                }
            }
            return session;
        }
    },
    secret: process.env.AUTH_SECRET
})