"use client";
import { FeedbackForm } from "./feedback-form";
import type {
  DetailedSubmission,
  FeedbackForm as FeedbackFormType,
  SubmissionStatus,
} from "@/lib/types/submissions";
import { CodeViewer } from "./code-viewer";
import { PageHeader } from "./page-head";

interface SubmissionDetailPageProps {
  submission: DetailedSubmission;
}

export const statusColor: Record<SubmissionStatus, string> = {
  Submitted: "bg-gray-stroke-strong/40 text-gray-text-weak border-2",
  "In Review":
    "bg-brand-secondary-stroke-strong/20 border-2 border-brand-secondary-stroke-strong",
  Completed:
    "bg-brand-primary-stroke-strong/30 text-brand-primary-stroke-strong border-2 border-brand-primary-stroke-strong",
};

export function SubmissionDetailPage({
  submission,
}: SubmissionDetailPageProps) {
  const handleFeedbackSubmit = (feedback: FeedbackFormType) => {
    console.log("Feedback submitted:", feedback);
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <PageHeader title={submission.title} />
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6">
          <div className="mb-6">
            <div className="rounded-lg shadow p-4 bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-lg">
                    {submission.title}
                  </span>
                  <span className="ml-2 text-xs bg-brand-primary-stroke-strong px-2 py-1 rounded-full text-base-white">
                    {submission.type}
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-md font-medium ${
                    statusColor[submission.status]
                  }`}
                >
                  {submission.status}
                </span>
              </div>
              <div className="text-sm text-gray-text-weak mt-2">
                {submission.author} • {submission.date}
              </div>
              <div className="mt-2 text-sm">{submission.description}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {submission.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-stroke-weak px-3 py-1 my-1 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="mb-6">
            <CodeViewer
              code={submission.code}
              language={submission.language}
              githubUrl={submission.githubUrl}
            />
          </div>

          {/* Feedback Section */}
          <div className="bg-[#FFFF] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-text-strong mb-4">
              Provide Feedback
            </h3>
            <FeedbackForm
              onSubmit={handleFeedbackSubmit}
              initialData={{
                score: submission.score,
                finalStatus: submission.finalStatus,
                comments: submission.feedback,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
