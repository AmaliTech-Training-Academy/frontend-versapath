import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useChangeSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setSearchParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set(key, value);
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const setMultipleSearchParams = useCallback(
    (paramsToSet: Record<string, string>) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      Object.entries(paramsToSet).forEach(([key, value]) => {
        params.set(key, value);
      });
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const removeSearchParam = useCallback(
    (key: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.delete(key);
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  return {
    setSearchParam,
    setMultipleSearchParams,
    removeSearchParam,
    searchParams,
  };
}
