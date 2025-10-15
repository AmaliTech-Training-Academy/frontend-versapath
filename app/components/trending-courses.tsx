import { courses } from "@/lib/api/landing-page-data";
import { CourseCard } from "./course-card";

export function TrendingCourses() {
  return (
    <section id="courses" className="py-10 lg:px-16 px-4 w-full flex flex-col items-center">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-text-weak">
            Trending Courses
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 md:gap-4 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
}
