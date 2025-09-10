import { DashBoardBadge } from "@/lib/api/badges";
import Image from "next/image";

export const BadgeCard = ({
    badge: { title, date, tag, icon }
}: { badge: DashBoardBadge }) => {
    return (
        <div className="rounded-md py-3 px-2 flex items-center gap-[10px] shadow-lg bg-[#ffffff]">
            <Image src={icon} alt="badge icon" width={40} height={40} />
            <div className="space-y-1">
                <p className="text-sm text-gray-text-strong">{title}</p>
                <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-text-weak">{date}</span>
                    <div className="rounded-2xl border border-gray-stroke-weak px-2 bg-gray-stroke-weaker flex items-center justify-center">
                        <span className="text-xs text-gray-text-weak">{tag}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}