"use client";

import useSWR from "swr";
import { apiGetMetrics } from "../api/metrics";
import { Roles } from "../types";
import { useSession } from "next-auth/react";

export function useMetrics(role: Roles) {
  const { data: session } = useSession();
  const { data, error, isLoading, mutate } = useSWR(["metrics", role], () =>
    role === Roles.MENTOR ? apiGetMetrics(role, session?.user.userId ?? "") : apiGetMetrics(role)
  );

  return {
    metrics: data ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}
