"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api/clusters";
import type { Cluster, ListData } from "@/lib/types/api";

type UseClustersResult = {
    items: Cluster[] | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
};

export function useClusters(): UseClustersResult {
    const [items, setItems] = useState<Cluster[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const res = await apiRequest<ListData<Cluster>>('/clusters', 'GET');

        setLoading(false);
        if (!res.status) {
            setError(res.message || "Error fetching skill categories.");
            return;
        }
        if (!res.data || res.data.items.length === 0) {
            setError("No skill categories added yet.");
            return;
        }

        setItems(res.data.items);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { items, loading, error, refetch: fetchData };
}
