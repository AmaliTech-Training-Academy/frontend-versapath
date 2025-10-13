"use client";
import useSWR from "swr";
import { apiRequest } from "./api-request";
import type { ApiResponse, BadgeApi } from "@/lib/types/api";

export function useMyBadges() {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponse<{ items: BadgeApi[] }>
  >("/badges/my-badges", (url: string) =>
    apiRequest<{ items: BadgeApi[] }>(url, "GET")
  );

  return {
    badges: data?.data?.items ?? [],
    loading: isLoading,
    error: error ? (error as Error).message : null,
    revalidate: mutate,
  };
}
