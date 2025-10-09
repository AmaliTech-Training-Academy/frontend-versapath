"use client";
import Link from "next/link";
import { BadgeCardDetail } from "./badge-card";
import { DashboardHeader } from "../../components/header";
import { ChevronRight } from "lucide-react";

interface BadgeDetailProps {
  badge?: {
    id: string;
    title: string;
    description: string;
    dateIssued: string;
    expiresDate: string;
    skills: string[];
    earningCriteria: string;
  };
}

export function BadgeDetail({ badge }: BadgeDetailProps) {
  const defaultBadge = {
    id: "1",
    title: "VersaPath Certified JavaScript Essentials",
    description:
      "A digital credential awarded to learners who successfully complete structured skill tracks and performance assessments. Validates proficiency in JavaScript fundamentals, problem-solving ability, and career readiness, and can be shared on LinkedIn, resumes, or professional portfolios.",
    dateIssued: "Sep. 30, 2025",
    expiresDate: "Sep. 30, 2025",
    skills: ["React", "TypeScript", "Components"],
    earningCriteria:
      "Successfully complete structured skill tracks and performance assessments.",
  };

  const displayBadge = badge || defaultBadge;

  const handleDownload = () => {
  };

  const handleShare = () => {
  };

  return (
    <div className="">
      <DashboardHeader title="Badges & Achievement" />
      <div className="flex items-center gap-2 text-xs py-4">
        <Link
          href="/dashboard/badges"
          className="hover:text-brand-primary-text"
        >
          Badges
        </Link>
        <ChevronRight size={17} />
        <span className="text-brand-primary-text">{displayBadge.title}</span>
      </div>

      <BadgeCardDetail
        badge={displayBadge}
        onDownload={handleDownload}
        onShare={handleShare}
      />
    </div>
  );
}
