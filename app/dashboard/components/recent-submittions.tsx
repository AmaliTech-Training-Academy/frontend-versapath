import React from "react";
import { Submission, SubmissionStatus } from "@/lib/types/submuttions";
import { SubmissionCard } from "./submission-card";
import { CardHeader } from "./card-header";

interface RecentSubmissionsProps {
  readonly submissions: Submission[];
}

export function RecentSubmissions({ submissions }: RecentSubmissionsProps) {
  return (
    <section className="rounded-xl p-5 space-y-4 bg-[#ffffff]">
      <CardHeader title="Recent Submittions" url="#" />
      <div className="space-y-4">
        {submissions.map((item, id) => (
          <SubmissionCard key={id} {...item} status={item.status as SubmissionStatus} />
        ))}
      </div>
    </section>
  );
}
