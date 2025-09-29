"use client";

import useSWR from "swr";
import { apiGetMetrics } from "../api/metrics";
import { Roles } from "../types";

export function useMetrics(role: Roles) {
  const { data, error, isLoading, mutate } = useSWR(["metrics", role], () =>
    apiGetMetrics(role)
  );

  return {
    metrics: data ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}
