import { signIn } from "next-auth/react";

export const apiLogin = async (
    email: string,
    password: string
): Promise<{
    success: boolean,
    error?: string
}> => {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    //     method: 'post',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ email, password })
    // }).then(res => res.json());

    // return response;

    console.log('Email: ', email);
    console.log('Password: ', password);
    const response = {
        status: true,
        message: "Login successful",
        data: {
            user: {
                id: "1f214023-2204-42c9-b59c-21e580ce0ece",
                username: "admin@example.com",
                fullName: "Admin User",
                email: "admin@example.com",
                role: "LEARNER"
            }
        },
        errors: null
    }

    const nextAuthRes = await signIn("credentials", {
        user: JSON.stringify(response.data.user),
        redirect: false
    });

    if (nextAuthRes?.error) {
        return { success: false, error: nextAuthRes.error };
    }

    return { success: true };
}