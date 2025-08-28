'use client'
import { DashboardHeader } from "../components/header";
import { TopActions } from "../components/top-actions";
import  {LessonsList}   from "./components/skill-atoms-list";
const dummyLessons = [
  {
    id: 1,
    title: "Introduction to React",
    subtitle: "Learn about components, props, and state in React.",
    status: "draft",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    subtitle: "Closures, async/await, and ES6+ features explained.",
    status: "published",
  },
  {
    id: 3,
    title: "Next.js Basics",
    subtitle: "Pages, layouts, routing, and API routes.",
    status: "published",
  },
  {
    id: 4,
    title: "TypeScript for Beginners",
    subtitle: "Strongly type your React apps with TypeScript.",
    status: "draft",
  },
]

export default function LessonListPage() {
  return (
    <>
      <DashboardHeader title="User Management" />
      <section className="bg-sidebar p-3 rounded-lg  h-full">
        <TopActions />
        <LessonsList
        lessons={dummyLessons}
        onView={(id) => console.log("View lesson:", id)}
        onEdit={(id) => console.log("Edit lesson:", id)}
        onDelete={(id) => console.log("Delete lesson:", id)}
      />
      </section>
    </>
  );
}
