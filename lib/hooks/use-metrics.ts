"use client";

import useSWR from "swr";
import { apiGetMetrics } from "../api/metrics";

export function useMetrics() {
    const { data, error, isLoading, mutate} = useSWR("metrics", apiGetMetrics);

    return {
        metrics: data ?? [],
        isLoading,
        error,
        refresh: mutate
    }
}