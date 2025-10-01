"use client";

import useSWR, { mutate } from "swr";
import { ItemData, type ListData } from "@/lib/types/api";
import { apiRequest } from "./api-request";
import { GrowthTrack } from "../types/growth-track";

type Params = { pageIndex?: number; pageSize?: number; name?: string };
type GrowthTrackResponse = Omit<GrowthTrack, "capsules"> & {
  capsuleNumber: number;
};
const fetcher = (url: string) =>
  apiRequest<ListData<GrowthTrackResponse>>(url, "GET");
const singleTrackFetcher = (url: string) =>
  apiRequest<ItemData<GrowthTrack>>(url, "GET");

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
export const useFetchSingleTrack = (id: string) => {
  const { data, isLoading, error } = useSWR(
    `/growth-tracks/${id}`,
    singleTrackFetcher
  );
  return {
    singleTrack: data,
    isFetchingSingleTrack: isLoading,
    fetchTrackError: error,
  };
};
export const updateTrackSkills = async ({
  existingIds,
  selectedIds,
  trackId,
}: {
  existingIds: string[];
  selectedIds: string[];
  trackId: string;
}) => {
  const endpoint = `/growth-tracks/assignCapsule/${trackId}`;
  const deleteEndpoint = `/growth-tracks/removeCapsule?trackId=${trackId}`;
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
        apiRequest<GrowthTrack>(endpoint, "PATCH", {
          capsuleIds: [...new Set(idsToAdd)],
        })
      );
    }

    if (idsToRemove.length > 0) {
      resultPromises.push(
        apiRequest<GrowthTrack>(deleteEndpoint, "DELETE", {
          capsuleIds: [...new Set(idsToRemove)],
        })
      );
    }

    const results = await Promise.all(resultPromises);

    const allSuccessful = results.every((result) => result.success);

    if (!allSuccessful) {
      const failedResult = results.find((result) => !result.success);
      return {
        success: false,
        message: failedResult?.message || "Failed to update track skills",
        errors: failedResult?.errors || ["Update operation failed"],
      };
    }

    return {
      success: true,
      message: "Track skills updated successfully",
      data: results,
    };
  } catch (error) {
    console.error("Error updating track skills:", error);
    return {
      success: false,
      message: "An unexpected error occurred while updating skill atoms",
      errors: [error instanceof Error ? error.message : "Unknown error"],
    };
  }
};
