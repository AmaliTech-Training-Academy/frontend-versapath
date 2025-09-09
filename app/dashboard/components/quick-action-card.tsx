import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface QuickActionCardProps {
    title: string;
    description: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const QuickActionCard = ({ title, description, icon: Icon }: QuickActionCardProps) => {
    return (
        <article className="space-y-1 border border-gray-stroke-weak rounded-xl p-4 cursor-pointer hover:shadow-xl">
            <div className="rounded-[99px] text-brand-secondary-stroke-weak p-2 w-fit border border-brand-primary-text bg-[#338280]">
                <Icon className="w-[18px] h-[18px] text-brand-secondary-text" />
            </div>
            <div>
                <span className="text-sm text-gray-text-strong font-semibold">{title}</span>
                <h6 className="text-xs text-gray-text-weak">{description}</h6>
            </div>
        </article>
    );
};