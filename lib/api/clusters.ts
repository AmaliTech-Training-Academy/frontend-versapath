"use client";

import useSWR, { mutate } from "swr";
import type { Cluster, ListData } from "@/lib/types/api";
import { apiRequest } from "./api-request";

type Params = { pageIndex?: number; pageSize?: number; name?: string };

const fetcher = (url: string) => apiRequest<ListData<Cluster>>(url, "GET");

export function useClusters(params?: Params) {
  const pageIndex = params?.pageIndex ?? 0;
  const pageSize = params?.pageSize ?? 10;
  const name = (params?.name ?? "").trim();

  const base = name ? "/clusters/filter" : "/clusters";
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

/** Refresh all cluster caches (both list and filter). */
export function revalidateAllClusters() {
  mutate((key) =>
    typeof key === "string" &&
    (key.startsWith("/clusters?") || key.startsWith("/clusters/filter?"))
  );
}