// import { BadgeDetail } from "@/components/dashboard/badge-detail"

import { BadgeDetail } from "../components/badge-detail";

export default function BadgeDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <BadgeDetail />
    </div>
  )
}
