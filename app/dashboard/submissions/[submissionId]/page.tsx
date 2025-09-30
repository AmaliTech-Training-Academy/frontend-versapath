"use client";
import React from "react";
import { SubmissionDetailPage as SubmissionDetailComponent } from "./components/submission-detail-page";
import { mockSubmission } from "@/lib/api/dummy-submissions";

type SubmissionDetailPageProps = {
  params: { submissionId: string };
};

export default function SubmissionDetailPage({ params,}: SubmissionDetailPageProps) {
   return <SubmissionDetailComponent submission={mockSubmission} />;
}
