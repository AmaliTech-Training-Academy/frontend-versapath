export interface Submission  {
  title: string;
  type: string;
  status: string;
  statusColor: string;
  author: string;
  date: string;
  description: string;
  tags: string[];
};

export type SubmissionStatus = "Submitted" | "In Review" | "Completed";

export interface SubmissionCard {
  title: string;
  type: string;
  status: SubmissionStatus;
  author: string;
  date: string;
  description: string;
  tags: string[];
}

export const statusColor: Record<SubmissionStatus, string> = {
  Submitted: "bg-gray-stroke-strong/40 text-gray-text-weak border-2",
  "In Review":
    "bg-brand-secondary-stroke-strong/20 border-2 border-brand-secondary-stroke-strong",
  Completed:
    "bg-brand-primary-stroke-strong/30 text-brand-primary-stroke-strong border-2 border-brand-primary-stroke-strong",
};