import { Cluster } from "@/lib/types/api";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/outline";
import image from "@/public/images/category-placeholder.jpg"
import Image from "next/image";

export const CategoryCard = ({ category: {
    name,
    description,
    imageName
} }: { category: Cluster }) => {
    console.log(imageName);
    return (
        <Link href="#" aria-label={`View category ${name}`} className="w-full h-full">
            <div className="rounded-b-xl shadow-lg w-full h-full">
                <Image src={imageName ?? image} alt={name} width={1000} height={667} className="min-h-[240px] object-cover" />
                <div className="py-3 px-2 space-y-4">
                    <div className="space-y-1">
                        <p className="font-semibold text-lg text-gray-text-strong">{name}</p>
                        <p className="text-sm text-gray-text-weak">{description}</p>
                    </div>
                    <div className="flex items-center gap-6 text-gray-text-weak">
                        <div className="flex items-center gap-1">
                            <BookOpen size={15} />
                            <span className="text-sm">12 Skills</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <UsersIcon className="w-4" />
                            <span className="text-sm">12 Learners</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};