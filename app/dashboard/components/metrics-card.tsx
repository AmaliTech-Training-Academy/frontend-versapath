import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface MetricsCardProps {
  title: string;
  value: number;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const MetricsCard = ({ title, value, icon: Icon }: MetricsCardProps) => {
  return (
    <article className="space-y-4 border rounded-lg py-4 px-5">
      <div className="flex items-center justify-between">
        <span className="text-gray-text-strong/70">{title}</span>
        <div className="border border-brand-primary-text-weak rounded-lg p-4">
          <Icon className="w-[18px] h-[18px] text-brand-primary-text" />
        </div>
      </div>
      <h6 className="font-semibold text-2xl text-gray-text-strong/70">{value}</h6>
    </article>
  );
};
