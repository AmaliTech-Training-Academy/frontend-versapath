import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
                console.log(credentials);
                const user = {
                    "id": "1f214023-2204-42c9-b59c-21e580ce0ece",
                    "username": "admin@example.com",
                    "fullName": "Admin User",
                    "email": "admin@example.com",
                    "role": "LEARNER"
                };

                console.log(user);

                return user;
            }
        })
    ]
})