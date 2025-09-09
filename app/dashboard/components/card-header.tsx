import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const CardHeader = ({ title, url }: { title: string; url: string; }) => {
    return (
        <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-text-strong">{title}</p>
            <Link href={url} className="px-3 flex items-center gap-2 text-brand-primary-text">
                <span className="font-medium text-sm tracking-normal">View All</span>
                <ChevronRight />
            </Link>
        </div>
    );
}