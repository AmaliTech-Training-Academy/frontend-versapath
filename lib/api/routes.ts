"use client";

import useSWR from "swr";
import type { Route, ListData } from "@/lib/types/api";
import { apiRequest } from "./api-request";

type Params = { pageIndex?: number; pageSize?: number; name?: string };

const fetcher = (url: string) => apiRequest<ListData<Route>>(url, "GET");

export function useRoutes(withTracks=false, params?: Params) {
  const pageIndex = params?.pageIndex ?? 0;
  const pageSize = params?.pageSize ?? 10;
  const searchQuery = new URLSearchParams({
    page: String(pageIndex),
    size: String(pageSize),
  });

  const endpoint = `/roadmap/talent-routes${withTracks ? "/with-tracks" : ""}?${searchQuery.toString()}`;

  const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher);

  return {
    routes: data?.data?.items ?? [],
    pageInfo: data?.data?.pagination,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    revalidateRoutes: () => mutate(),
  };
}