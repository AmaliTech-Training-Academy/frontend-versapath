"use client";

import useSWR from "swr";
import type { MyTrack } from "@/lib/types/api";
import { apiRequest } from "./api-request";

const trackFetcher = (url: string) => apiRequest<MyTrack[]>(url, "GET");

export function useTrack(learnerId: string) {
    const { data, error, isLoading, mutate } = useSWR(`/learner/my-tracks/${learnerId}`, trackFetcher);

    return {
        track: data?.data?.at(0) ?? undefined,
        loading: isLoading,
        error: error ? (error as Error).message : null,
        revalidateRoadmap: () => mutate(),
    };
}

export function useAllTracks(learnerId: string) {
    const { data, error, isLoading, mutate } = useSWR(`/learner/my-tracks/${learnerId}`, trackFetcher);

    return {
        tracks: data?.data ?? undefined,
        loading: isLoading,
        error: error ? (error as Error).message : null,
        revalidateRoadmap: () => mutate(),
    };
}