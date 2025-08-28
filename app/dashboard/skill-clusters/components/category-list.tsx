"use client";
import { mockApiGetAllClusters } from "@/lib/api/clusters";
import { Cluster } from "@/lib/types/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { set } from "zod";

const EmptyState = ({ message = "Error fetching skill categories" }: { message: string }) => {
    return (
        <>
            <Image
                src="/not-found.png"
                alt={message}
                height={100}
                width={100}
            />
            <span className="text-sm text-[#525252]">{message}</span>
        </>
    );
}

export const CategoryList = () => {
    const [items, setItems] = useState<Cluster[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await mockApiGetAllClusters();

            setLoading(false);
            if (!res.status) {
                setError(res.message || "Error fetching skill categories.");
                return;
            }
            if (!res.data || res.data.items.length === 0) {
                setError("No skill categories added yet.");
                return;
            }
            
            setItems(res.data.items);
        };

        fetchData();
    }, []);

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
