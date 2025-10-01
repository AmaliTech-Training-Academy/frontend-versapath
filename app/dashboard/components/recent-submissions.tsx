import React from "react";
import { Submission, SubmissionStatus } from "@/lib/types/submissions";
import { dummySubmissions } from "@/lib/api/dummy-submissions";
import { SubmissionCard } from "./submission-card";
import { CardHeader } from "./card-header";

interface RecentSubmissionsProps {
  readonly submissions: Submission[];
}

export function RecentSubmissions({ submissions }: RecentSubmissionsProps) {
  const recentSubmissions = dummySubmissions.slice(0, 3);
  return (
    <section className="rounded-xl p-5 space-y-4 bg-[#ffffff]">
      <CardHeader title="Recent Submittions" url="#" />
      <div className="flex flex-wrap gap-6">
        {recentSubmissions.map(({ id, ...item }) => (
          <SubmissionCard
            key={id ?? item.title}
            id={String(id)}
            {...item}
            status={item.status as SubmissionStatus}
          />
        ))}
      </div>
    </section>
  );
}
