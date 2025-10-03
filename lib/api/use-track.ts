"use client";

import useSWR from "swr";
import type { MyTrack } from "@/lib/types/api";
import { apiRequest } from "./api-request";

const trackFetcher = (url: string) => apiRequest<MyTrack[]>(url, "GET");

export function useTrack() {
    const { data, error, isLoading, mutate } = useSWR('/learner/my-tracks', trackFetcher);

    return {
        track: data?.data?.at(0) ?? undefined,
        loading: isLoading,
        error: error ? (error as Error).message : null,
        revalidateRoadmap: () => mutate(),
    };
}