"use client";

import useSWR, { mutate } from "swr";
import type { ListData } from "@/lib/types/api";
import { apiRequest } from "./api-request";
import { GrowthTrack } from "../types/growth-track";

type Params = { pageIndex?: number; pageSize?: number; name?: string };
type GrowthTrackResponse = Omit<GrowthTrack, "capsules"> & {
  capsuleNumber: number;
};
const fetcher = (url: string) =>
  apiRequest<ListData<GrowthTrackResponse>>(url, "GET");

export function useGrowthTracks(params?: Params) {
  const pageIndex = params?.pageIndex ?? 0;
  const pageSize = params?.pageSize ?? 10;
  const name = (params?.name ?? "").trim();

  const base = name ? "/growth-tracks/filter" : "/growth-tracks";
  const searchQuery = new URLSearchParams({
    page: String(pageIndex),
    size: String(pageSize),
  });
  if (name) searchQuery.set("name", name);

  const key = `${base}?${searchQuery.toString()}`;

  const { data, error, isLoading, mutate } = useSWR(key, fetcher);

  return {
    items: data?.data?.items ?? [],
    pageInfo: data?.data?.pagination,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    reload: () => mutate(),
  };
}

// Refresh all cluster caches (both list and filter)
export function revalidateAllGrowthTracks() {
  mutate((key) => typeof key === "string" && key.startsWith("/talent-routes"));
}
