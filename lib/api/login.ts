import { signIn } from "next-auth/react";
import { ItemData, User } from "../types/api";
import { extractErrorMessage } from "../utils";
import { apiRequest } from "./api-request";

export const apiLogin = async (
    email: string,
    password: string
): Promise<{
    success: boolean,
    error?: string
}> => {
    const result = await apiRequest<ItemData<User>>('/auth/login', 'POST', { email, password });

    if (!result.success) {
        const msg = extractErrorMessage(result.errors as string[], result.message)
        return { success: false, error: msg }
    }

    const user = result.data;
    if(!user) {
        return { success: false, error: result.message || "Invalid response payload" };
    }

    const nextAuthRes = await signIn("credentials", {
        user: JSON.stringify(user),
        redirect: false
    });

    if (nextAuthRes?.error) {
        return { success: false, error: nextAuthRes.error || 'Unable to log in. Please try again.' };
    }

    return { success: true };
};