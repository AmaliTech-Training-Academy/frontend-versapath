import { getSession, signOut } from "next-auth/react";
import { ApiResponse, resWithoutData } from "../types/api";
import { extractErrorMessage } from "../utils";

export const handleLogOut = async () => {
    const session = await getSession();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'post',
        headers: {
            'Authorization': `Bearer ${session?.user.accessToken}`
        },
        credentials: 'include'
    });

    const result: ApiResponse<resWithoutData> = await response.json();

    if (!response.ok || !result.status) {
        const msg = extractErrorMessage(result.errors as string[], result.message)
        return { success: false, error: msg }
    }

    await signOut({ redirectTo: "/login" });
};