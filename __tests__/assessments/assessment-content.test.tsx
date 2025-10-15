import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { AssessmentContent } from "@/app/dashboard/assessments/components/assessment-content";
import { AssessmentStatus, AssessmentType, Roles } from "@/lib/types";
import type { MentorAssessment } from "@/lib/api/assesments";

vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    className?: string;
    disabled?: boolean;
    variant?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) => <button {...props}>{children}</button>,
}));

vi.mock("lucide-react", () => ({
  Dot: (props: Record<string, unknown>) => <svg aria-hidden="true" {...props} />,
}));

// Common helpers to keep objects fully-shaped
const base = (overrides: Partial<MentorAssessment>): Omit<MentorAssessment, "type" | "content" | "questions"> => ({
  id: "id-1",
  title: "Title",
  description: "Desc",
  status: AssessmentStatus.DRAFT,
  createdAt: "Sep 23. 2025, 10:30",
  tags: ["React"],
  assigned: [
    {
      id: "learner-1",
      email: "jane@example.com",
      username: "jane",
      role: Roles.LEARNER,
      firstName: "Jane",
      lastName: "Doe",
      // The concrete type in your app is often StaticImageData; a string is fine for the test runtime.
      profilePictureUrl: "/avatar.png",
    },
  ],
  ...overrides,
});

describe("AssessmentContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders quiz questions (QUIZ) with options, answers, and control buttons", () => {
    const assessment: MentorAssessment = {
      ...base({ id: "quiz-1", title: "JS Basics Quiz", status: AssessmentStatus.ACTIVE }),
      type: AssessmentType.QUIZ,
      questions: [
        {
          question: "What is the output of `typeof null`?",
          options: ["'null'", "'object'", "'undefined'"],
          answer: "'object'",
        },
        {
          question: "Which method converts JSON string to object?",
          options: ["JSON.parse", "JSON.stringify", "Object.fromJSON"],
          answer: "JSON.parse",
        },
      ],
    };

    render(<AssessmentContent assessment={assessment} />);

    // Questions and answers
    expect(screen.getByText("What is the output of `typeof null`?")).toBeInTheDocument();
    expect(screen.getByText("Which method converts JSON string to object?")).toBeInTheDocument();
    expect(screen.getByText("'null'")).toBeInTheDocument();
    expect(screen.getByText("'object'")).toBeInTheDocument();
    expect(screen.getByText("'undefined'")).toBeInTheDocument();
    expect(screen.getByText("JSON.parse")).toBeInTheDocument();
    expect(screen.getByText("JSON.stringify")).toBeInTheDocument();
    expect(screen.getByText("Object.fromJSON")).toBeInTheDocument();
    expect(screen.getByText("Answer: 'object'")).toBeInTheDocument();
    expect(screen.getByText("Answer: JSON.parse")).toBeInTheDocument();

    // Control buttons
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("renders project/lab content (CODE_LAB) sections only when arrays are non-empty", () => {
    const assessment: MentorAssessment = {
      ...base({ id: "lab-1", title: "React Component Lab", status: AssessmentStatus.ACTIVE }),
      type: AssessmentType.CODE_LAB,
      content: {
        learningObjectives: ["Understand component composition", "Manage state with hooks"],
        projectSetup: ["Clone repo", "Install deps", "Start dev server"],
        tasks: [
          { task: "Build a Todo component", subtasks: ["Add input", "Add list", "Handle submit"] },
          { task: "Add filtering", subtasks: ["All", "Active", "Completed"] },
          { task: "Write basic tests", subtasks: [] },
        ],
      },
    };

    render(<AssessmentContent assessment={assessment} />);

    // Section headers
    expect(screen.getByText("Learning Objectives")).toBeInTheDocument();
    expect(screen.getByText("Project Setup")).toBeInTheDocument();
    expect(screen.getByText("Tasks")).toBeInTheDocument();

    // Items inside each section
    expect(screen.getByText("Understand component composition")).toBeInTheDocument();
    expect(screen.getByText("Manage state with hooks")).toBeInTheDocument();

    expect(screen.getByText("Clone repo")).toBeInTheDocument();
    expect(screen.getByText("Install deps")).toBeInTheDocument();
    expect(screen.getByText("Start dev server")).toBeInTheDocument();

    expect(screen.getByText("Build a Todo component")).toBeInTheDocument();
    expect(screen.getByText("Add filtering")).toBeInTheDocument();
    expect(screen.getByText("Write basic tests")).toBeInTheDocument();

    expect(screen.getByText("Add input")).toBeInTheDocument();
    expect(screen.getByText("Add list")).toBeInTheDocument();
    expect(screen.getByText("Handle submit")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("omits empty sections when content arrays are empty (PROJECT)", () => {
    const assessment: MentorAssessment = {
      ...base({ id: "proj-empty", title: "Empty Sections Project", status: AssessmentStatus.SCHEDULED }),
      type: AssessmentType.PROJECT,
      content: {
        learningObjectives: [],
        projectSetup: [],
        tasks: [],
      },
    };

    render(<AssessmentContent assessment={assessment} />);

    expect(screen.queryByText("Learning Objectives")).not.toBeInTheDocument();
    expect(screen.queryByText("Project Setup")).not.toBeInTheDocument();
    expect(screen.queryByText("Tasks")).not.toBeInTheDocument();
    expect(screen.queryByText(/No additional details available/i)).not.toBeInTheDocument();
  });

  it("falls back when quiz has no questions (QUIZ with empty array)", () => {
    const assessment: MentorAssessment = {
      ...base({ id: "quiz-empty", title: "Quiz with no questions", status: AssessmentStatus.ARCHIVED }),
      type: AssessmentType.QUIZ,
      questions: [],
    };

    render(<AssessmentContent assessment={assessment} />);

    expect(
      screen.getByText("No additional details available for this assessment.")
    ).toBeInTheDocument();
  });
});