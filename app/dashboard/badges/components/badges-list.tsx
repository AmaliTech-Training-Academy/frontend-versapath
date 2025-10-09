import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { BadgeIcon } from "./badge-icon";
import { DashboardHeader } from "../../components/header";
// import { BadgeIcon } from "@/components/ui/badge-icon"

interface Badge {
  id: string;
  title: string;
  description: string;
  dateIssued: string;
  imageUrl: string;
}

interface BadgesListProps {
  badges?: Badge[];
}

export function BadgesList({ badges = [] }: BadgesListProps) {
  // Mock data if no badges provided
  const defaultBadges: Badge[] = [
    {
      id: "1",
      title: "VersaPath Certified JavaScript Essentials",
      description:
        "A digital credential awarded to learners who successfully complete structured skill tracks and performance assessments.",
      dateIssued: "Sep. 30, 2025",
      imageUrl: "/images/badge-js-essentials.png",
    },
    {
      id: "2",
      title: "VersaPath Certified JavaScript Essentials",
      description:
        "A digital credential awarded to learners who successfully complete structured skill tracks and performance assessments.",
      dateIssued: "Sep. 30, 2025",
      imageUrl: "/images/badge-js-essentials.png",
    },
    {
      id: "3",
      title: "VersaPath Certified JavaScript Essentials",
      description:
        "A digital credential awarded to learners who successfully complete structured skill tracks and performance assessments.",
      dateIssued: "Sep. 30, 2025",
      imageUrl: "/images/badge-js-essentials.png",
    },
    {
      id: "4",
      title: "VersaPath Certified JavaScript Essentials",
      description:
        "A digital credential awarded to learners who successfully complete structured skill tracks and performance assessments.",
      dateIssued: "Sep. 30, 2025",
      imageUrl: "/images/badge-js-essentials.png",
    },
  ];

  const displayBadges = badges.length > 0 ? badges : defaultBadges;

  return (
    <>
      <DashboardHeader title="Badges & Achievement" />
      <div className="p-4 bg-base-light-white">
        <h2 className="py-2 text-gray-text-strong font-semibold text-xl">
          View Earned Badges & Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayBadges.map((badge) => (
            <Link key={badge.id} href={`/dashboard/badges/${badge.id}`}>
              <Card className="border border-gray-stroke-strong/70 hover:shadow-lg transition-shadow cursor-pointer w-[337px]">
                <CardContent className="">
                  <div className="flex flex-col items-center">
                    <BadgeIcon
                      size={200}
                      className="drop-shadow-lg"
                      showSubject={true}
                      subjectLine1="JavaScript"
                      subjectLine2="Essentials"
                    />

                    {/* Badge Info */}
                    <div className="w-full text-gray-text-strong/80 py-1 space-y-1 ">
                      <h2 className="font-semibold line-clamp-1">
                        {badge.title}
                      </h2>
                      <p className="text-sm line-clamp-1">
                        {badge.description}
                      </p>
                      <p className="text-xs">
                        Date Issued: {badge.dateIssued}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
