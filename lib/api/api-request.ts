import { getSession } from "next-auth/react";
import { ApiResponse } from "../types/api";

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const apiRequest = async <T>(
    endpoint: string,
    method: ApiMethod,
    data?: unknown,
    auth = true
): Promise<ApiResponse<T>> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
    const options: RequestInit = { method };

    if(auth) {
        const session = await getSession();
        options.headers = {
            'Authorization': `Bearer ${session?.user.accessToken}`
        };
        options.credentials = 'include';
    }
    
    if(data !== undefined) {
        options.headers = { ...options.headers, 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options).then(res => res.json());
    return response;
}