"use client";
import { EmptyState } from "@/components/custom/empty-state";
import { useClusters } from "@/lib/hooks/use-clusters";
import { CategoryCard } from "./category-card";

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
                    <div className="w-full grid grid-cols-4 gap-6">
                        {
                            items.map((category) => (
                                <CategoryCard key={category.id} category={category} />
                            ))
                        }
                    </div>
                ) : (
                    <EmptyState message="No skill categories added yet." />
                )
            }
        </section>
    );
};
