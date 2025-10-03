"use client";

import useSWR from "swr";
import type { MyTrack, MyTrackCapsule } from "@/lib/types/api";
import { apiRequest } from "./api-request";

const trackFetcher = (url: string) => apiRequest<MyTrack>(url, "GET");
const capsulesFetcher = (url: string) => apiRequest<MyTrackCapsule[]>(url, "GET");

export function useTrack() {
    const { data, error, isLoading, mutate } = useSWR('/learner/my-tracks', trackFetcher);

    return {
        track: data?.data ?? undefined,
        loading: isLoading,
        error: error ? (error as Error).message : null,
        revalidateRoadmap: () => mutate(),
    };
}

export function useTrackCapsules(trackId: string) {
    const { data, isLoading, error, mutate } = useSWR(`/learner/my-tracks/${trackId}/capsules`, capsulesFetcher);

    return {
        capsules: data?.data ?? [],
        loading: isLoading,
        error: error ? (error as Error).message : null,
        revalidateCapsules: () => mutate()
    }
}