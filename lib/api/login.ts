import { ApiResponse, User } from "../types/api";

export const apiLogin = async (email: string, password: string): Promise<ApiResponse<User>> => {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    //     method: 'post',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ email, password })
    // }).then(res => res.json());

    // return response;
    return {
        "status": true,
        "message": "Login successful",
        "data": {
            "user": {
                "id": "1f214023-2204-42c9-b59c-21e580ce0ece",
                "username": "admin@example.com",
                "fullName": "Admin User",
                "email": "admin@example.com",
                "role": "LEARNER"
            }
        },
        "errors": null
    }
}