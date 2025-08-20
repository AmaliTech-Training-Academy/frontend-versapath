import { ApiResponse, User } from "../types/api";

export const apiLogin = async (email:string, password: string): Promise<ApiResponse<User>> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(res => res.json());

    return response;
}