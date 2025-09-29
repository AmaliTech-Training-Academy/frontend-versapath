import { dummySubmissions } from "@/lib/api/dummy-submissions";
import { SubmissionCard } from "../components/submission-card";
import type { SubmissionStatus } from "@/lib/types/submission-card";

export default function SubmissionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Submissions
          </h1>
          <p className="text-muted-foreground">
            Manage and review all submissions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {dummySubmissions.map(({ id, ...item }) => (
            <SubmissionCard
              key={id}
              id={String(id)}
              {...item}
              status={item.status as SubmissionStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
