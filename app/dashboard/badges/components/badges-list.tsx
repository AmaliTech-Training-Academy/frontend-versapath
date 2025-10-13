"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { BadgeIcon } from "./badge-icon";
import { DashboardHeader } from "../../components/header";
import { useMyBadges } from "@/lib/api/use-my-badges";
import { BackendBadge } from "@/lib/types/badges";

export function BadgesList() {
  const { badges: backendBadges, loading, error } = useMyBadges();

  const displayBadges = (backendBadges as BackendBadge[]).map((b) => ({
    id: b.badgeId,
    title: b.title,
    description: b.description,
    dateIssued: b.issuedOn,
  }));

  if (loading) return <div>Loading badges...</div>;
  if (error) return <div>Error loading badges: {error}</div>;

  return (
    <>
      <DashboardHeader title="Badges & Achievement" />
      <div className="p-4 bg-base-light-white">
        <h2 className="py-2 text-gray-text-strong font-semibold text-xl">
          View Earned Badges & Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayBadges.map((badge) => {
            let subjectLine1 = badge.title;
            let subjectLine2 = "";
            const completionMatch = badge.title.match(
              /(.*)(Completion Badges?|Completion\s+Badges?)$/i
            );
            if (completionMatch) {
              subjectLine1 = completionMatch[1].trim();
              subjectLine2 = completionMatch[2].trim();
            }
            return (
              <Link key={badge.id} href={`/dashboard/badges/${badge.id}`}>
                <Card className="border border-gray-stroke-strong/70 hover:shadow-lg transition-shadow cursor-pointer w-[337px]">
                  <CardContent className="">
                    <div className="flex flex-col items-center">
                      <BadgeIcon
                        size={200}
                        className="drop-shadow-lg"
                        showSubject={true}
                        subjectLine1={subjectLine1}
                        subjectLine2={subjectLine2}
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
            );
          })}
        </div>
      </div>
    </>
  );
}
