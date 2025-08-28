"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { LessonCardMenu } from "./lesson-card-menu"

interface LessonCardProps {
  lesson: {
    id: number
    title: string
    subtitle: string
  }
  onView?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export const LessonCard = ({ lesson, onView, onEdit, onDelete }: LessonCardProps) => {
  return (
    <Card className="hover:shadow-md  cursor-pointer px-3 py-2 group bg-gray-stroke-weak/20">
      <CardContent className="p-1">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1 my-2">
            <div className="flex-shrink-0 mt-1">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-Text-Text-Strong/90 font-semibold text-lg">{lesson.title}</h3>
              <p className="text-sm text-gray-text-strong/70">{lesson.subtitle}</p>
            </div>
          </div>

          <LessonCardMenu
            onView={() => onView?.(lesson.id)}
            onEdit={() => onEdit?.(lesson.id)}
            onDelete={() => onDelete?.(lesson.id)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
