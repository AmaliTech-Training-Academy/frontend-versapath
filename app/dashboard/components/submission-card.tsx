import React from "react";
import Link from "next/link";
import { SubmissionStatus, SubmissionCardProps } from "@/lib/types/submission-card";

const statusColor: Record<SubmissionStatus, string> = {
  Submitted: "bg-gray-stroke-strong/40 text-gray-text-weak border-2",
  "In Review":
    "bg-brand-secondary-stroke-strong/20 border-2 border-brand-secondary-stroke-strong",
  Completed:
    "bg-brand-primary-stroke-strong/30 text-brand-primary-stroke-strong border-2 border-brand-primary-stroke-strong",
};
export const SubmissionCard: React.FC<SubmissionCardProps> = ({
  title,
  type,
  status,
  author,
  date,
  description,
  tags,
 
}) => (
  <Link
    href="#"
    className="block w-full text-left rounded-lg p-4 shadow border cursor-pointer hover:bg-brand-primary-stroke-strong/10 transition focus:outline-none"
  
  >
    <div className="flex justify-between items-center">
      <div>
        <span className="font-semibold text-lg">{title}</span>
        <span className="ml-2 text-xs bg-brand-primary-stroke-strong px-2 py-1 rounded-full text-base-white">
          {" "}
          {type}{" "}
        </span>
      </div>
      <span
        className={`text-xs px-2 py-1 rounded-md font-medium ${statusColor[status]}`}
      >
        {status}
      </span>
    </div>
    <div className="text-sm text-gray-text-weak mt-2">
      {author} • {date}{" "}
    </div>
    <div className="mt-2 text-sm">{description}</div>
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xs bg-gray-stroke-weak px-3 py-1 my-1 rounded-lg"
        >
          {tag}
        </span>
      ))}
    </div>
  </Link>
);