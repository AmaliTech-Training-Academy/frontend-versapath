"use client";

import useSWR from "swr";
import type { ListData } from "@/lib/types/api";
import { apiRequest } from "./api-request";

type Params = { pageIndex?: number; pageSize?: number; name?: string };
export type MentorLearner = { email: string; firstName: string; lastName: string };

const fetcher = (url: string) => apiRequest<ListData<MentorLearner>>(url, "GET");

export function useMentorLearners(mentorId: string, params?: Params) {
  const pageIndex = params?.pageIndex ?? 0;
  const pageSize = params?.pageSize ?? 10;
  const searchQuery = new URLSearchParams({
    page: String(pageIndex),
    size: String(pageSize),
  });

  const { data, error, isLoading, mutate } = useSWR(`/roadmap/mentors/assigned-learners/${mentorId}?${searchQuery.toString()}`, fetcher);

  return {
    learners: data?.data?.items ?? [],
    pageInfo: data?.data?.pagination,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    revalidateLearners: () => mutate(),
  };
}