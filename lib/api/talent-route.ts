"use client";

import useSWR, { mutate } from "swr";
import type { ItemData, ListData } from "@/lib/types/api";
import { TalentRoute } from "../types/talent-route";
import { apiRequest } from "./api-request";

type Params = { pageIndex?: number; pageSize?: number; name?: string };

const fetcher = (url: string) => apiRequest<ListData<TalentRoute>>(url, "GET");
const singleRouteFetcher = (url: string) =>
  apiRequest<ItemData<TalentRoute>>(url, "GET");

export function useTalentRoutes(params?: Params) {
  const pageIndex = params?.pageIndex ?? 0;
  const pageSize = params?.pageSize ?? 10;
  const name = (params?.name ?? "").trim();

  const base = name ? "/talent-routes/filter" : "/talent-routes";
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
export function revalidateAllTalentRoutes() {
  mutate((key) => typeof key === "string" && key.startsWith("/talent-routes"));
}
export const useFetchSingleRoute = (id: string) => {
  const res = useSWR(`/talent-routes/${id}`, singleRouteFetcher);
  return {
    singleRoute: res.data,
    isFetchingSingleRoute: res.isLoading,
    singleRouteFetchError: res.error,
  };
};
export const updateRouteTracks = async ({
  existingIds,
  selectedIds,
  routeId,
}: {
  existingIds: string[];
  selectedIds: string[];
  routeId: string;
}) => {
  const endpoint = `/talent-routes/assignTrack/${routeId}`;
  const deleteEndpoint = `/talent-routes/removeTracks?routeId=${routeId}`;
  const idsToAdd = selectedIds.filter((id) => !existingIds.includes(id));
  const idsToRemove = existingIds.filter((id) => !selectedIds.includes(id));

  if (idsToAdd.length === 0 && idsToRemove.length === 0) {
    return {
      success: true,
      message: "No changes to update",
      data: null,
    };
  }

  try {
    const resultPromises = [];

    if (idsToAdd.length > 0) {
      resultPromises.push(
        apiRequest<TalentRoute>(endpoint, "PATCH", {
          trackIds: [...new Set(idsToAdd)],
        })
      );
    }

    if (idsToRemove.length > 0) {
      resultPromises.push(
        apiRequest<TalentRoute>(deleteEndpoint, "DELETE", {
          trackIds: [...new Set(idsToRemove)],
        })
      );
    }

    const results = await Promise.all(resultPromises);

    const allSuccessful = results.every((result) => result.success);

    if (!allSuccessful) {
      const failedResult = results.find((result) => !result.success);
      return {
        success: false,
        message: failedResult?.message || "Failed to update route tracks",
        errors: failedResult?.errors || ["Update operation failed"],
      };
    }

    return {
      success: true,
      message: "Track skills updated successfully",
      data: results,
    };
  } catch (error) {
    console.error("Error updating route tracks:", error);
    return {
      success: false,
      message:
        "An unexpected error occurred while updating route growth tracks",
      errors: [error instanceof Error ? error.message : "Unknown error"],
    };
  }
};
