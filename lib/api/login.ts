import { signIn } from "next-auth/react";
import { ApiErrors, ApiResponse, LoginData, User } from "../types/api";
import { extractErrorMessage } from "../utils";

export const apiLogin = async (
    email: string,
    password: string
): Promise<{
    success: boolean,
    error?: string
}> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result: ApiResponse<LoginData<User>> = await response.json();

    if (!response.ok || result.status === false) {
        const msg = extractErrorMessage(result.errors as string[], result.message)
        return { success: false, error: msg }
    }

    const userData = result.data?.item;
    if(!userData) {
        return { success: false, error: result.message || "Invalid response payload" };
    }
    
    const user = { ...userData, accessToken: result.data?.accessToken };

    const nextAuthRes = await signIn("credentials", {
        user: JSON.stringify(user),
        redirect: false
    });

    if (nextAuthRes?.error) {
        return { success: false, error: nextAuthRes.error || 'Unable to log in. Please try again.' };
    }

    return { success: true };
}

export const mockApiLogin = async (
    email: string,
    password: string
): Promise<{
    success: boolean,
    error?: string
}> => {
    if(email !== 'admin@example.com' || password !== 'asdfgh') {
        return { success: false, error: "Email and password don't match. Please try again." }
    }

    const response = {
        status: true,
        message: "Login successful",
        data: {
            user: {
                id: "1f214023-2204-42c9-b59c-21e580ce0ece",
                username: "admin@example.com",
                fullName: "Admin User",
                email: "admin@example.com",
                role: "ADMIN"
            }
        },
        errors: null
    }

    const nextAuthRes = await signIn("credentials", {
        user: JSON.stringify(response.data.user),
        redirect: false
    });

    if (nextAuthRes?.error) {
        return { success: false, error: nextAuthRes.error || 'Unable to log in. Please try again.' };
    }

    return { success: true };
}