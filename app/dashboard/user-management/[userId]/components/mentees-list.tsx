import React, { useState } from "react";
import {dummyMentees} from "@/lib/mocks/lessons"
interface Mentee {
  id: string;
  name: string;
  avatarUrl?: string;
  date?: string;
  lastFeedback?: string;
  lastActivity?: string;
}

interface MenteesListProps {
  mentees: Mentee[];
}

export const MenteesList: React.FC<MenteesListProps> = ({ mentees }) => {
  const [selectedMenteeId, setSelectedMenteeId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedMenteeId(selectedMenteeId === id ? null : id);
  };

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Mentees</h2>
      <div className="flex flex-row gap-4 flex-wrap">
        {mentees.map((mentee) => (
          <button
            key={mentee.id}
            type="button"
            className={`flex flex-col items-center gap-2 bg-gray-stroke-weak/25 p-3 rounded-lg cursor-pointer min-w-[180px] border transition-all ${
              selectedMenteeId === mentee.id 
                ? "border-brand-primary-text/20"
                : "border-transparent"
            }`}
            onClick={() => handleSelect(mentee.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleSelect(mentee.id);
              }
            }}
            tabIndex={0}
            aria-pressed={selectedMenteeId === mentee.id}
          >
            {mentee.avatarUrl && (
              <img
                src={mentee.avatarUrl}
                alt={mentee.name}
                className="w-18 h-18 rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-sm font-semibold text-gray-text-strong">
                {mentee.name}
              </p>
              {mentee.date && (
                <p className="text-xs text-gray-text-weak">{mentee.date}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedMenteeId && (
        <div className="mt-6">
          {mentees
            .filter((mentee) => mentee.id === selectedMenteeId)
            .map((mentee) => (
              <div
                key={mentee.id}
                className="bg-gray-stroke-weak/25 rounded-md px-4 py-2 text-md font-semibold text-gray-text-strong/90 w-full "
              >
                {mentee.lastFeedback || (
                  <span className="text-gray-text-weak">No feedback available.</span>
                )}
                {mentee.lastActivity && (
                  <div className=" text-gray-text-weak/70 mt-1">
                    {mentee.lastActivity}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
      {mentees.length === 0 && (
        <div className="text-gray-stroke-weak text-sm mt-4">No mentees found.</div>
      )}
    </section>
  );
};


export default function DemoMenteesList() {
  return <MenteesList mentees={dummyMentees} />;
}
