import { signOut } from "next-auth/react";
import { resWithoutData } from "../types/api";
import { extractErrorMessage } from "../utils";
import { apiRequest } from "./api-request";

export const handleLogOut = async () => {
    const result = await apiRequest<resWithoutData>('/auth/logout', 'POST');

    if (!result.success) {
        const msg = extractErrorMessage(result.errors as string[], result.message)
        return { success: false, error: msg }
    }

    await signOut({ redirectTo: "/login" });
};