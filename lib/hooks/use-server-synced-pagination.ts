"use client";

import { useEffect, useRef } from "react";
import { usePaginationUrl, type PaginationState } from "./use-pagination-url";
import { PageInfo } from "../types/api";

interface SyncOptions {
    defaultPageSize?: number;
    pageParam?: string;
    sizeParam?: string;
}

export function useServerSyncedPagination(
    pageInfo: PageInfo | null | undefined,
    {
        defaultPageSize = 12,
        pageParam,
        sizeParam,
    }: SyncOptions = {}
) {
    const [pagination, setPagination, syncPagination] = usePaginationUrl({
        defaultPageSize,
        pageParam,
        sizeParam,
    });

    const lastNormalized = useRef<PaginationState | null>(null);

    useEffect(() => {
        if (!pageInfo) return;

        const serverPageIndex = pageInfo.page ?? 0;
        const serverPageSize = Math.max(1, pageInfo.size ?? pagination.pageSize);

        const differs = serverPageIndex !== pagination.pageIndex || serverPageSize !== pagination.pageSize;

        const already =
            lastNormalized.current &&
            lastNormalized.current.pageIndex === serverPageIndex &&
            lastNormalized.current.pageSize === serverPageSize;

        if (differs && !already) {
            const newState = { pageIndex: serverPageIndex, pageSize: serverPageSize };
            lastNormalized.current = newState;
            syncPagination(newState);
        }
    }, [pageInfo, pagination.pageIndex, pagination.pageSize, syncPagination]);

    return [pagination, setPagination] as const;
}
