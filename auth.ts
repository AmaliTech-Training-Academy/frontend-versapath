import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

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