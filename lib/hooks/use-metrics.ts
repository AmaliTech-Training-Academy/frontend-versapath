"use client";

import useSWR from "swr";
import { apiGetMetrics } from "../api/metrics";
import { Roles } from "../types";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export function useMetrics(role: Roles) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { data, error, isLoading, mutate } = useSWR(["metrics", role, pathname], () =>
    role === Roles.MENTOR ? apiGetMetrics(role, session?.user.userId ?? "", pathname) : apiGetMetrics(role)
  );

  return {
    metrics: data ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}
