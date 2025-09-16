"use client";
import { EmptyState } from "@/components/custom/empty-state";
import { CategoryCard } from "./category-card";
import { Loader } from "lucide-react";
import clsx from "clsx";
import { Pagination } from "@/components/custom/pagination";
import { paginationCalculator } from "@/lib/hooks/pagination-calculator";
import { useClusters } from "@/lib/api/clusters";
import { useListQuery } from "@/lib/hooks/use-list-query";
import { useEffect } from "react";

export const CategoryList = () => {
    const [query, setQuery] = useListQuery();

    const { items, pageInfo, loading, error } = useClusters({
        pageIndex: query.page,
        pageSize: query.size,
        name: query.name,
    });

    // Optional: one small normalization to server truth (no extra bells/whistles)
    useEffect(() => {
        if (!pageInfo) return;
        const serverPage = Math.max(0, pageInfo.page ?? query.page);
        const serverSize = Math.max(1, pageInfo.size ?? query.size);
        if (serverPage !== query.page || serverSize !== query.size) {
            setQuery({ page: serverPage, size: serverSize });
        }
    }, [pageInfo, query.page, query.size, setQuery]);

    const {
        currentPage,
        totalPages,
        totalItems,
        start,
        end,
        prevDisabled,
        nextDisabled,
    } = paginationCalculator({
        items,
        pageInfo,
        pagination: { pageIndex: query.page, pageSize: query.size }
    });

    const hasData = items && items.length > 0;

    const containerClass = clsx(
        "w-full h-full mt-4 flex flex-col rounded-xl p-4 gap-6",
        { "items-center justify-center": loading || error || !hasData }
    );

    if (loading) {
        return (
            <section className={containerClass} aria-busy="true" aria-live="polite">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader className="size-4 animate-spin" />
                    <span>Loading…</span>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className={containerClass}>
                <EmptyState message={error} />
            </section>
        );
    }

    return (
        <section className={containerClass}>
            {
                hasData ? (
                    <>
                        <div className="w-full grid grid-cols-4 gap-6">
                            {
                                items.map((category) => (
                                    <CategoryCard key={category.id} category={category} />
                                ))
                            }
                        </div>
                        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                            <div className="flex-1 text-sm text-muted-foreground">
                                Showing {start} to {end} {totalItems > end && <> of {totalItems}</>} resources.
                            </div>
                            <Pagination
                                nextDisabled={!nextDisabled}
                                prevDisabled={!prevDisabled}
                                handleNext={() => setQuery({ page: query.page + 1 })}
                                handlePrev={() => setQuery({ page: Math.max(query.page - 1, 0) })}
                                activePage={currentPage + 1}
                                totalPages={totalPages}
                                handlePaginationBtnClick={(val) => setQuery({ page: Math.max(val, 0) })}
                            />
                        </div>
                    </>
                ) : (
                    <EmptyState message="No skill categories added yet." />
                )
            }
        </section>
    );
};
