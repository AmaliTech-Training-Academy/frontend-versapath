export type SubmissionStatus = "Submitted" | "In Review" | "Completed";

export interface SubmissionCardProps {
  id?: string,
  title: string;
  type: string;
  status: SubmissionStatus;
  author: string;
  date: string;
  description: string;
  tags: string[];
  href?: string;
}
