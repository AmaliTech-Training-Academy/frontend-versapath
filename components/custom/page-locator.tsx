import { ChevronRight } from "lucide-react";

export const PageLocator = ({ from, to }: { from: string; to: string; }) => {
    return (
        <header className="flex items-center gap-2">
            <span className="text-xs text-gray-stroke-strong">{from}</span>
            <ChevronRight size={16} className="text-gray-stroke-strong" />
            <span className="text-xs font-semibold text-brand-primary-text">{to}</span>
        </header>
    );
}