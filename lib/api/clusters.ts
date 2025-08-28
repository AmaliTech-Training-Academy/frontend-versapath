import { ApiResponse, Cluster, ListData } from "../types/api";

export const apiGetAllClusters = async (): Promise<ApiResponse<ListData<Cluster>>> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clusters`).then(res => res.json());

    const result: ApiResponse<ListData<Cluster>> = await response.json();

    return result;
}

export const mockApiGetAllClusters = async (): Promise<ApiResponse<ListData<Cluster>>> => {
    return {
        "status": false,
        "message": "Fetch all clusters",
        "data": {
            "items": [
                {
                    "id": "8e2fe4c3-6cba-44f1-953d-ff336bdbdbcc",
                    "name": "Frontend Development",
                    "type": "Technical",
                    "status": "ACTIVE",
                    "description": "Covers foundational",
                    "createdAt": "2025-08-21T08:27:50.806823"
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