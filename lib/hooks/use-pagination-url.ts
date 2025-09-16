"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface PaginationState {
    pageIndex: number;
    pageSize: number;
}

interface Options {
    defaultPageSize?: number;
    pageParam?: string;
    sizeParam?: string;
}

export function usePaginationUrl({
    defaultPageSize = 12,
    pageParam = "page",
    sizeParam = "size",
}: Options = {}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const pageIndex = Number(searchParams.get(pageParam)) >= 0 ? Number(searchParams.get(pageParam)) : 0;
    const pageSize = Number(searchParams.get(sizeParam)) > 0 ? Number(searchParams.get(sizeParam)) : defaultPageSize;

    const navigate = (state: PaginationState, preserveScroll: boolean) => {
        const sp = new URLSearchParams(searchParams.toString());
        sp.set(pageParam, String(Math.max(0, state.pageIndex)));
        sp.set(sizeParam, String(Math.max(1, state.pageSize)));

        router.replace(`${pathname}?${sp.toString()}`, {
            scroll: !preserveScroll,
        });
    };

    // For user actions (next/prev/page click), scrolls to top
    const setPagination = (next: PaginationState, opts?: { preserveScroll?: boolean }) => {
        navigate(next, opts?.preserveScroll ?? false);
    };

    // For server normalization, never scroll
    const syncPagination = (next: PaginationState) => {
        navigate(next, true);
    };

    return [{ pageIndex, pageSize }, setPagination, syncPagination] as const;
}