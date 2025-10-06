import { SkillAtom as LessonProps } from "@/lib/types/skill-atom";

import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useRouter } from "next/dist/client/components/navigation";

type LessonListCardProps = {
  data: LessonProps & { skillId: string };
  index: number;
  total: number;
  isSkillActive: boolean;
};
export const SingleLessonListCard = ({
  data,
  index,
  total,
  isSkillActive,
}: LessonListCardProps) => {
  const router = useRouter();
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const handleOpenLesson = () => {
    if (!isSkillActive) {
      toast.error("Please start the skill to access its lessons.");
    } else {
      router.push(
        `/dashboard/skills/${data.skillId}/contents?activeLesson=${data.id}&moodleId=${data.moodlePageId}`
      );
    }
  };
  return (
    <button
      onClick={handleOpenLesson}
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
          <DocumentTextIcon className="size-6 text-gray-text-strong/70" />
        </div>
        <p className="font-semibold leading-none capitalize min-w-20 text-gray-text-strong/90">
          Lesson
        </p>
        <h3 className="w-full line-clamp-1 group-hover:underline group-hover:underline-offset-1 transition-all duration-300">
          {data.name}
        </h3>
      </div>
    </button>
  );
};
