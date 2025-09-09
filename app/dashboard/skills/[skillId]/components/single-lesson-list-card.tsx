import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

type IconsProp = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
  } & RefAttributes<SVGSVGElement>
>;
type LessonListCardProps = {
  data: {
    title: string;
    id: number;
    icon: IconsProp;
    type: string;
  };
  index: number;
  total: number;
};
export const SingleLessonListCard = ({
  data,
  index,
  total,
}: LessonListCardProps) => {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <Link
      href={`/dashboard/skills/${data.id}/contents?activeLesson=${index + 1}`}
      className="text-start flex justify-start w-full gap-0 even:bg-gray-stroke-weak/50 group"
    >
      {/* Number line gutter */}
      <div className="ps-4 pe-5 py-4 bg-base-light-white relative">
        {!isFirst && (
          <div className="w-0.5 absolute left-[25.5px] top-0 bottom-10 bg-gray-text-weak/30" />
        )}
        {!isLast && (
          <div className="w-0.5 absolute left-[25.5px] top-10 bottom-0 bg-gray-text-weak/30" />
        )}
        <p className="w-6 h-6 absolute left-[14px] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-gray-text-weak/30 text-base-light-white text-sm rounded-full font-semibold overflow-hidden">
          {index + 1}
        </p>
        <div className="w-6 h-full" />
      </div>

      <div className="flex items-center w-full gap-6 text-gray-text-strong/70 py-4 ps-1">
        <div>
          <data.icon className="size-6 text-gray-text-strong/70" />
        </div>
        <p className="font-semibold leading-none capitalize min-w-20 text-gray-text-strong/90">
          {data.type}
        </p>
        <h3 className="w-full line-clamp-1 group-hover:underline group-hover:underline-offset-1 transition-all duration-300">
          {data.title}
        </h3>
      </div>
    </Link>
  );
};
