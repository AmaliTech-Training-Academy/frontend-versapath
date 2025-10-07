'use client'
import Link from "next/link"
import { BadgeCardDetail } from "./badge-card"

interface BadgeDetailProps {
  badge?: {
    id: string
    title: string
    description: string
    dateIssued: string
    expiresDate: string
    skills: string[]
    earningCriteria: string
  }
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
    earningCriteria: "Successfully complete structured skill tracks and performance assessments.",
  }

  const displayBadge = badge || defaultBadge

  const handleDownload = () => {
    // console.log("[v0] Downloading badge:", displayBadge.id)
  }

  const handleShare = () => {
    // console.log("[v0] Sharing badge:", displayBadge.id)
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <Link href="/dashboard/badges" className="hover:text-cyan-600 dark:hover:text-cyan-400">
            Badges
          </Link>
          <span>/</span>
          <span className="text-cyan-600 dark:text-cyan-400">{displayBadge.title}</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Badges & Achievement</h1>
      </div>

      <BadgeCardDetail badge={displayBadge} onDownload={handleDownload} onShare={handleShare} />
    </div>
  )
}
