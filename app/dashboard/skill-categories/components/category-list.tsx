"use client";
import { EmptyState } from "@/components/custom/empty-state";
import { CategoryCard } from "./category-card";
import { Loader } from "lucide-react";
import clsx from "clsx";
import { Pagination } from "@/components/custom/pagination";
import { paginationCalculator } from "@/lib/hooks/pagination-calculator";
import { useClusters } from "@/lib/api/clusters";
import { useServerSyncedPagination } from "@/lib/hooks/use-server-synced-pagination";

export const CategoryList = () => {
    const [pagination, setPagination] = useServerSyncedPagination(undefined);

    // Fetch using desired pagination (from URL)
    const { items, pageInfo, loading, error } = useClusters({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
    });

    // the hook will auto-normalize the URL on the next render
    useServerSyncedPagination(pageInfo);

    const {
        currentPage,
        totalPages,
        totalItems,
        start,
        end,
        prevDisabled,
        nextDisabled,
    } = paginationCalculator({ items, pageInfo, pagination });

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
                                handleNext={() =>
                                    setPagination({ pageIndex: pagination.pageIndex + 1, pageSize: pagination.pageSize })
                                }
                                handlePrev={() =>
                                    setPagination({ pageIndex: Math.max(pagination.pageIndex - 1, 0), pageSize: pagination.pageSize })
                                }
                                activePage={currentPage + 1}
                                totalPages={totalPages}
                                handlePaginationBtnClick={(val) =>
                                    setPagination({ pageIndex: Math.max(val, 0), pageSize: pagination.pageSize })
                                }
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
