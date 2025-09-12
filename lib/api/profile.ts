import { signIn, signOut } from "next-auth/react";
import { ItemData, User } from "../types/api";
import { extractErrorMessage } from "../utils";
import { apiRequest } from "./api-request";

export const apiUpdateProfile = async (
    firstName: string,
    lastName: string,
    username: string
): Promise<{
    success: true;
    user: User
} | {
    success: false;
    error: string
}> => {
    const result = await apiRequest<User>('/users/profile', 'PATCH', { firstName, lastName, username });

    if (!result.success || !result.data) {
        const msg = extractErrorMessage(result.errors as string[], result.message)
        return { success: false, error: msg || "Invalid response payload" }
    }

    return { success: true, user: result.data };
};