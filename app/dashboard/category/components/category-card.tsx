import { Cluster } from "@/lib/types/api";
import Link from "next/link";

export const CategoryCard = ({ category: {
    name,
    description,
} }: { category: Cluster }) => {
    return (
        <Link href="#" aria-label={`View category ${name}`} className="w-full h-full">
            <div className="rounded-b-xl shadow-lg w-full h-full">
                <div className="py-3 px-2 space-y-4">
                    <div className="space-y-1">
                        <p className="font-semibold text-lg text-gray-text-strong">{name}</p>
                        <p className="text-sm text-gray-text-weak">{description}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};