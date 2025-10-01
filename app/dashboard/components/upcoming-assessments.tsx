"use client";
import { Assessment, Day } from "@/lib/types/assessment";
import React, { useState } from "react";


interface UpcomingAssessmentsProps {
  assessments?: Assessment[];
  days?: Day[];
}

export function UpcomingAssessments({assessments = [],days = [],}: UpcomingAssessmentsProps) {
  const [selectedDay, setSelectedDay] = useState(
    days && days.length > 0 ? days[0].date : ""
  );

  if (!Array.isArray(days) || days.length === 0) {
    return (
      <section className="p-4 bg-white rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Upcoming Assessments</h2>
        <div className="text-gray-stroke-weak text-center py-8">
          <p>No assessment days available</p>
        </div>
      </section>
    );
  }
  
  const filteredAssessmentsByDay = assessments.filter((a) => a.date === selectedDay);

  return (
    <section className="bg-[#ffffff] rounded-xl p-5 space-y-4">
      <h2 className="font-semibold text-lg mb-2">Upcoming Assessments</h2>
      
      {/* Day selector buttons */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {days.map((day) => (
          <button
            key={day.date}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedDay === day.date 
                ? "bg-brand-primary-stroke-strong/5 text-brand-primary-stroke-strong border-2 border-brand-primary-stroke-strong text-white shadow-md" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedDay(day.date)}
          >
            <div className="text-xs font-medium">{day.short}</div>
            <div className="font-bold text-sm">{day.day}</div>
          </button>
        ))}
      </div>

      {/* Assessment list */}
      <div className="space-y-3">
        {filteredAssessmentsByDay.length > 0 ? (
          filteredAssessmentsByDay.map((assessment, idx) => (
            <div
              key={`${assessment.date}-${idx}`}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">
                  {assessment.title}
                </div>
                <div className="text-sm text-gray-500">
                  {assessment.dateStr}
                </div>
              </div>
              <span className="text-xs bg-white px-3 py-1 rounded-full border border-gray-200 font-medium text-gray-600">
                {assessment.type}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No assessments scheduled for this day</p>
          </div>
        )}
      </div>
    </section>
  );
}