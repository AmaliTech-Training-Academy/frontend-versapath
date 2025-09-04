import { ApiResponse } from "../types/api";

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const apiRequest = async <T>(
    endpoint: string,
    method: ApiMethod,
    data?: unknown
): Promise<ApiResponse<T>> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
    const options: RequestInit = {
        method,
        credentials: 'include'
    };
    
    if(data !== undefined) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options).then(res => res.json());
    return response;
}