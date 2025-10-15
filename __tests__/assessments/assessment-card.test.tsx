// __tests__/assessment/assessment-card.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AssessmentCard } from "@/app/dashboard/assessments/components/assessment-card";

// Mock next/image
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}));

vi.mock("@/lib/types", () => ({
  AssessmentStatus: {
    DRAFT: "DRAFT",
    ACTIVE: "ACTIVE",
    SCHEDULED: "SCHEDULED",
    ARCHIVED: "ARCHIVED",
  } as const,
}));

type Assigned = {
  id: string;
  firstName: string;
  profilePictureUrl: string;
};

type AssessmentLike = {
  id: string;
  title: string;
  description: string;
  type: string;
  status: "DRAFT" | "ACTIVE" | "SCHEDULED" | "ARCHIVED";
  createdAt: string;
  tags: string[];
  assigned: Assigned[];
};

const makeAssessment = (overrides: Partial<AssessmentLike> = {}): AssessmentLike => ({
  id: "a-1",
  title: "React Component Lab",
  description: "Build a reusable component library",
  type: "CODE_LAB",
  status: "DRAFT",
  createdAt: "Sep 23. 2025, 10:30",
  tags: ["React", "TypeScript", "Components"],
  assigned: [
    { id: "u1", firstName: "Ada", profilePictureUrl: "/a.png" },
    { id: "u2", firstName: "Linus", profilePictureUrl: "/b.png" },
    { id: "u3", firstName: "Grace", profilePictureUrl: "/c.png" },
    { id: "u4", firstName: "Ken", profilePictureUrl: "/d.png" },
  ],
  ...overrides,
});

describe("AssessmentCard", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders as a button-like article with tabIndex=0", () => {
    const assessment = makeAssessment();
    render(<AssessmentCard assessment={assessment as any} />);
    const article = screen.getByRole("button");
    expect(article.tagName.toLowerCase()).toBe("article");
    expect(article).toHaveAttribute("tabindex", "0");
  });

  it("renders title, type badge, created date, description, and tags", () => {
    const assessment = makeAssessment({
      title: "Auth Lab",
      type: "PROJECT",
      createdAt: "Oct 01. 2025, 09:00",
      description: "Implement JWT auth",
      tags: ["React", "JWT", "Auth"],
    });
    render(<AssessmentCard assessment={assessment as any} />);

    // Title
    expect(screen.getByText("Auth Lab")).toBeInTheDocument();
    // Type badge
    expect(screen.getByText("PROJECT")).toBeInTheDocument();
    // Created at
    expect(screen.getByText("Created:")).toBeInTheDocument();
    expect(screen.getByText("Oct 01. 2025, 09:00")).toBeInTheDocument();
    // Description
    expect(screen.getByText("Implement JWT auth")).toBeInTheDocument();
    // Tags
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JWT")).toBeInTheDocument();
    expect(screen.getByText("Auth")).toBeInTheDocument();
  });

  it("shows up to 4 assigned avatars with firstName as alt text", () => {
    const assessment = makeAssessment({
      assigned: [
        { id: "u1", firstName: "Ada", profilePictureUrl: "/a.png" },
        { id: "u2", firstName: "Linus", profilePictureUrl: "/b.png" },
        { id: "u3", firstName: "Grace", profilePictureUrl: "/c.png" },
        { id: "u4", firstName: "Ken", profilePictureUrl: "/d.png" },
        { id: "u5", firstName: "Bjarne", profilePictureUrl: "/e.png" },
      ],
    });

    render(<AssessmentCard assessment={assessment as any} />);

    // Only first 4 alts should be present
    expect(screen.getByAltText("Ada")).toBeInTheDocument();
    expect(screen.getByAltText("Linus")).toBeInTheDocument();
    expect(screen.getByAltText("Grace")).toBeInTheDocument();
    expect(screen.getByAltText("Ken")).toBeInTheDocument();
    expect(screen.queryByAltText("Bjarne")).not.toBeInTheDocument();
  });

  it("styles the status badge correctly for each AssessmentStatus", () => {
    // The component applies Tailwind classes conditionally by status:
    // DRAFT      -> bg-gray-stroke-weak   border-gray-stroke-strong text-gray-text-weak
    // ACTIVE     -> bg-brand-primary-text-weak border-brand-primary-text text-brand-primary-text
    // SCHEDULED  -> bg-amber-stroke-weak  border-amber-stroke-strong text-gray-text-strong
    // ARCHIVED   -> bg-red-stroke-weak    border-red-stroke-strong   text-red-text
    const cases: Array<[
      AssessmentLike["status"],
      string[] // classes expected to be contained in the status container
    ]> = [
      ["DRAFT", ["bg-gray-stroke-weak", "border-gray-stroke-strong", "text-gray-text-weak"]],
      ["ACTIVE", ["bg-brand-primary-text-weak", "border-brand-primary-text", "text-brand-primary-text"]],
      ["SCHEDULED", ["bg-amber-stroke-weak", "border-amber-stroke-strong", "text-gray-text-strong"]],
      ["ARCHIVED", ["bg-red-stroke-weak", "border-red-stroke-strong", "text-red-text"]],
    ];

    for (const [status, expectedClasses] of cases) {
      const assessment = makeAssessment({ status });
      render(<AssessmentCard assessment={assessment as any} />);

      const badge = screen.getByText(status).parentElement;
      expect(badge).toBeTruthy();
      const className = badge!.className;
      for (const token of expectedClasses) {
        expect(className).toContain(token);
      }
    }
  });
});
