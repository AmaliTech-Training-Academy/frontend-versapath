"use client";
import { EmptyState } from "@/components/custom/empty-state";
import { useClusters } from "@/lib/hooks/use-clusters";

export const CategoryList = () => {
    const { items, loading, error } = useClusters();

    return (
        <section className="w-full h-full mt-4 flex flex-col items-center justify-center">
            {
                loading ? (
                    <span>Loading</span>
                ) : error ? (
                    <EmptyState message={error} />
                ) : items && items.length > 0 ? (
                    items.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{category.name}</span>
                            <span className="text-sm font-medium">{category.type}</span>
                        </div>
                    ))
                ) : (
                    <EmptyState message="No skill categories added yet." />
                )
            }
        </section>
    );
};
