"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type ListQuery = { page: number; size: number; name: string };

interface Options {
  defaultSize?: number;
  pageParam?: string;
  sizeParam?: string;
  nameParam?: string;
}

export function useListQuery({
  defaultSize = 12,
  pageParam = "page",
  sizeParam = "size",
  nameParam = "name",
}: Options = {}) {
  const sp = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = Math.max(0, Number(sp.get(pageParam) ?? 0) - 1);
  const size = Math.max(1, Number(sp.get(sizeParam) ?? defaultSize));
  const name = sp.get(nameParam) ?? "";

  const setQuery = (params: Partial<ListQuery>) => {
    const next = new URLSearchParams(sp.toString());
    next.set(pageParam, String((params.page ?? 0) + 1));
    next.set(sizeParam, String(Math.max(1, params.size ?? defaultSize)));

    if (params.name !== undefined) {
      const val = params.name.trim();
      if (val) next.set(nameParam, val);
      else next.delete(nameParam);
    }

    router.replace(`${pathname}?${next.toString()}`);
  };

  return [{ page, size, name }, setQuery] as const;
}