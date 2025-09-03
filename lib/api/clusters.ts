import { getSession } from "next-auth/react";
import { ApiResponse, Cluster, ItemData, ListData } from "../types/api";

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const apiGetAllClusters = async (): Promise<ApiResponse<ListData<Cluster>>> => {
    const session = await getSession();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clusters`, {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${session?.user.accessToken}`
        },
        credentials: 'include'
    }).then(res => res.json());

    return response;
}

export const apiCreateCluster = async (
    name: string,
    description: string,
    image: File | undefined,
): Promise<ApiResponse<ItemData<Cluster>>> => {
    const session = await getSession();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clusters`, {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${session?.user.accessToken}`
        },
        credentials: 'include'
    }).then(res => res.json());

    return response;
};

export const apiRequest = async <T>(
    endpoint: string,
    method: ApiMethod,
    data?: unknown
): Promise<ApiResponse<T>> => {
    const session = await getSession();
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
    const options: RequestInit = {
        method,
        headers: {
            'Authorization': `Bearer ${session?.user.accessToken}`
        },
        credentials: "include"
    };
    
    if(data !== undefined) {
        options.headers = { ...options.headers, 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options).then(res => res.json());
    return response;
}

export const mockApiGetAllClusters = async (): Promise<ApiResponse<ListData<Cluster>>> => {
    return {
        "status": true,
        "message": "Fetch all clusters",
        "data": {
            "items": [
                {
                    "id": "8e2fe4c3-6cba-44f1-953d-ff336bdbdbcc",
                    "name": "Frontend Development",
                    "type": "Technical",
                    "description": "Covers foundational",
                    "imageName": null,
                    "status": "INACTIVE",
                    "createdAt": "2025-08-21T08:27:50.806823",
                    "updatedAt": "2025-08-21T08:27:50.806823"
                },
                {
                    "id": "bdfda0be-3e0e-4844-85cc-fb3917a0b45e",
                    "name": "Backend Development",
                    "type": "Technical",
                    "description": "Covers foundational",
                    "imageName": null,
                    "status": "ACTIVE",
                    "createdAt": "2025-08-21T12:45:27.603209",
                    "updatedAt": "2025-08-21T12:45:27.603209"
                },
                {
                    "id": "e5d47eb2-b86f-481f-9f53-00139ad1407d",
                    "name": "Quality security",
                    "type": "QA Related",
                    "description": "Description here",
                    "imageName": null,
                    "status": "ACTIVE",
                    "createdAt": "2025-08-28T16:58:44.080368",
                    "updatedAt": "2025-08-28T16:58:44.080368"
                },
                {
                    "id": "e0602faf-e5a9-438b-b9b0-ec3e949b5c9c",
                    "name": "Quality sec",
                    "type": "QA Related",
                    "description": "Description here",
                    "imageName": null,
                    "status": "ACTIVE",
                    "createdAt": "2025-08-28T17:03:47.380332",
                    "updatedAt": "2025-08-28T17:03:47.380332"
                },
                {
                    "id": "45c79178-32b4-46b0-9fa7-739cdfa375b9",
                    "name": "Quality",
                    "type": "QA Related",
                    "description": "Description here",
                    "imageName": null,
                    "status": "ACTIVE",
                    "createdAt": "2025-08-28T17:09:08.778132",
                    "updatedAt": "2025-08-28T17:09:08.778132"
                },
                {
                    "id": "465e779f-7c30-407d-8564-ca4bfdecdad0",
                    "name": "Quality one",
                    "type": "QA Related",
                    "description": "Description here",
                    "imageName": null,
                    "status": "ACTIVE",
                    "createdAt": "2025-08-28T17:28:01.938552",
                    "updatedAt": "2025-08-28T17:28:01.938552"
                },
                {
                    "id": "2443091a-67c9-4320-83e7-4a36eed7743e",
                    "name": "Cleaning",
                    "type": "just cluster",
                    "description": "des",
                    "imageName": null,
                    "status": "ACTIVE",
                    "createdAt": "2025-08-28T18:47:31.885638",
                    "updatedAt": "2025-08-28T18:47:31.885638"
                },
                {
                    "id": "59de0cb0-c50b-403b-8eca-c5760c7f20a8",
                    "name": "Fire",
                    "type": "Fire description",
                    "description": "Descripto",
                    "imageName": null,
                    "status": "ACTIVE",
                    "createdAt": "2025-08-28T19:33:16.807247",
                    "updatedAt": "2025-08-28T19:33:16.807247"
                },
                {
                    "id": "f8b828f0-49cd-4e7c-874e-e6a7529d5967",
                    "name": "Cluster test",
                    "type": "test",
                    "description": "test description",
                    "imageName": "ad6ab089-b440-4643-a805-4ad449e2c547_negritude.jpg",
                    "status": "ACTIVE",
                    "createdAt": "2025-08-28T19:39:24.126208",
                    "updatedAt": "2025-08-28T19:39:24.126208"
                },
                {
                    "id": "4a5a0727-4a74-4f6b-ae24-25af7c6dcf1f",
                    "name": "VersaPath",
                    "type": "Tes",
                    "description": "dd",
                    "imageName": "89ed800e-1faf-458f-9a01-6919184fb351_api.png",
                    "status": "ACTIVE",
                    "createdAt": "2025-08-29T06:56:22.119509",
                    "updatedAt": "2025-08-29T06:56:22.119509"
                }
            ],
            "page": 0,
            "size": 20,
            "totalElements": 1,
            "totalPages": 1,
            "hasNext": false,
            "hasPrevious": false
        },
        "errors": null
    }
}