import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { BadgeIcon } from "./badge-icon"
// import { BadgeIcon } from "@/components/ui/badge-icon"

interface Badge {
  id: string
  title: string
  description: string
  dateIssued: string
  imageUrl: string
}

interface BadgesListProps {
  badges?: Badge[]
}

export function BadgesList({ badges = [] }: BadgesListProps) {
  // Mock data if no badges provided
  const defaultBadges: Badge[] = [
    {
      id: "1",
      title: "VersaPath Certified JavaScript Essentials",
      description:
        "A digital credential awarded to learners who successfully complete structured skill tracks and performance assessments.",
      dateIssued: "Sep. 30, 2025",
      imageUrl: "/images/badge-js-essentials.png",
    },
    {
      id: "2",
      title: "VersaPath Certified JavaScript Essentials",
      description:
        "A digital credential awarded to learners who successfully complete structured skill tracks and performance assessments.",
      dateIssued: "Sep. 30, 2025",
      imageUrl: "/images/badge-js-essentials.png",
    },
    {
      id: "3",
      title: "VersaPath Certified JavaScript Essentials",
      description:
        "A digital credential awarded to learners who successfully complete structured skill tracks and performance assessments.",
      dateIssued: "Sep. 30, 2025",
      imageUrl: "/images/badge-js-essentials.png",
    },
    {
      id: "4",
      title: "VersaPath Certified JavaScript Essentials",
      description:
        "A digital credential awarded to learners who successfully complete structured skill tracks and performance assessments.",
      dateIssued: "Sep. 30, 2025",
      imageUrl: "/images/badge-js-essentials.png",
    },
  ]

  const displayBadges = badges.length > 0 ? badges : defaultBadges

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Badges & Achievement</h1>
        <p className="text-gray-600 dark:text-gray-400">View Earned Badges & Achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayBadges.map((badge) => (
          <Link key={badge.id} href={`/dashboard/badges/${badge.id}`}>
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Badge Icon */}
                  <BadgeIcon size={100} className="drop-shadow-md" />

                  {/* Badge Info */}
                  <div className="space-y-2 w-full">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">{badge.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{badge.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Date Issued: {badge.dateIssued}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
