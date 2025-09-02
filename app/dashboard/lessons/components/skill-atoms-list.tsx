"use client"
import React, { useState } from "react"
import Image from "next/image"
import { SkillAtomCard } from "./skill-atom-card"
import { ConfirmDialog } from "@/components/custom/confirm-dialog" 

interface Lesson {
  id: number
  title: string
  subtitle: string
}

interface LessonsListProps {
  lessons: Lesson[]
  onView?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export const SkillAtomsList: React.FC<LessonsListProps> = ({ lessons, onView, onEdit, onDelete }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  const handleDeleteClick = (lesson: Lesson) => {
    setSelectedLesson(lesson)
  }


  if (lessons.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Image
          src={"/not-found.png"}
          alt="No lessons found"
          height={100}
          width={100}
        />
        <p className="text-sm text-gray-500 mt-2">No lessons found</p>
      </section>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {lessons.map((lesson) => (
          <SkillAtomCard
            key={lesson.id}
            lesson={lesson}
            onView={onView}
            onEdit={onEdit}
            onDelete={() => handleDeleteClick(lesson)}
          />
        ))}
      </div>

      <ConfirmDialog
        open={!!selectedLesson}
        onClose={() => setSelectedLesson(null)}
        title="Delete Lesson?"
        description="Are you sure you want to delete this lesson? This action will delete the respective lesson permanently. You might want to achieve it."
        confirmLabel="Delete"
        alternativeLabel="Achieve"
        destructive
        onConfirm={() => {
          if (selectedLesson) {
            onDelete?.(selectedLesson.id)
          }
        }}
        onAlternative={() => {

        }} 
      />
    </>
  )
}
