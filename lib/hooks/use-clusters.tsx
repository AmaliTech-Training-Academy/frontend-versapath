"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api/api-request";
import type { Cluster, ListData, PageInfo } from "@/lib/types/api";

type UseClustersResult = {
    items: Cluster[] | null;
    pageInfo: PageInfo | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
};

export function useClusters(): UseClustersResult {
    const [items, setItems] = useState<Cluster[] | null>(null);
    const [pageInfo, setPageInfo] = useState<PageInfo | null>(null)
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const res = await apiRequest<ListData<Cluster>>(`/clusters?page=${pageInfo?.page ? pageInfo.page + 1 : 0}`, 'GET');

        setLoading(false);
        if (!res.success) {
            setError(res.message || "Error fetching skill categories.");
            return;
        }
        if (!res.data || res.data.items.length === 0) {
            setError("No skill categories added yet.");
            return;
        }

        setItems(res.data.items);
        setPageInfo(res.data.pagination);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { items, pageInfo, loading, error, refetch: fetchData };
}
