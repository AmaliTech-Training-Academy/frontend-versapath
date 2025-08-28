// import Image from "next/image";
// import React from "react";

// export const SkillAtom = () => {
//   return (
//     <section className="w-full mt-4  h-full  flex items-center justify-center flex-col">
//       <Image
//         src={"/not-found.png"}
//         alt="No users found"
//         height={100}
//         width={100}
//       />
//       No No skill tag added yet
//     </section>
//   );
// };
"use client"

import React from "react"
import Image from "next/image"
import { LessonCard } from "./lesson-card"

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

export const LessonsList: React.FC<LessonsListProps> = ({ lessons, onView, onEdit, onDelete }) => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
