import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"
import Image from "next/image"
import { CourseCardProps } from "@/lib/types/landing-page"



export function CourseCard({ title, date, image, level, lessons }: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg p-0 transition-shadow border border-gray-stroke-weaker/20">
      <div className="relative aspect-video">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          <span className="text-sm text-gray-500 whitespace-nowrap ml-2">{date}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge  className="bg-gray-stroke-weak/50 border border-gray-stroke-weak text-sm  rounded-2xl py-1 px-3 text-gray-text-strong  font-normal">
              {level}
            </Badge>
            <Badge className="bg-gray-stroke-weak/50 border border-gray-stroke-weak text-sm  rounded-2xl py-1 px-3 text-gray-text-strong  font-normal">
              {lessons} Lessons
            </Badge>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 ">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
        <Button variant="secondary" className="w-full bg-[#F1F5F9] text-gray-text-strong cursor-pointer hover:bg-gray-stroke-weak font-medium">
          Start Learning
        </Button>
      </CardContent>
    </Card>
  )
}
