"use client";

import useSWR, { mutate } from "swr";
import type { Cluster, ListData } from "@/lib/types/api";
import { apiRequest } from "./api-request";

type Params = { pageIndex?: number; pageSize?: number };

const fetcher = (url: string) => apiRequest<ListData<Cluster>>(url, "GET");

export function useClusters(params?: Params) {
  const pageIndex = params?.pageIndex ?? 0;
  const pageSize  = params?.pageSize ?? 10;

  const { data, error, isLoading, mutate } = useSWR(
    `/clusters?page=${pageIndex}&size=${pageSize}`,
    fetcher
  );

  return {
    items: data?.data?.items ?? [],
    pageInfo: data?.data?.pagination,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    reload: () => mutate(),
  };
}

/** Call after create/update/delete to refresh ALL cluster pages */
export function revalidateAllClusters() {
  mutate(
    (key) => typeof key === "string" && key.startsWith("/clusters")
  );
}