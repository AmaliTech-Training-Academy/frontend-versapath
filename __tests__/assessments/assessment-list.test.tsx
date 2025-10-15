import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, beforeEach, describe, it, expect } from "vitest";

// We'll dynamically (re)mock the data module per test so we can test both non-empty and empty states.
type Assessment = {
  id: string;
  title: string;
};

const makeAssessments = (n: number): Assessment[] =>
  Array.from({ length: n }, (_, i) => ({
    id: String(i + 1),
    title: `Assessment ${i + 1}`,
  }));

// Stable mocks for child components
vi.mock("@/app/dashboard/assessments/components/assessment-card", () => ({
  AssessmentCard: ({ assessment }: { assessment: Assessment }) => (
    <div data-testid={`card-${assessment.id}`}>Card: {assessment.title}</div>
  ),
}));

vi.mock("@/app/dashboard/assessments/components/assessment-content", () => ({
  AssessmentContent: ({ assessment }: { assessment: Assessment }) => (
    <div data-testid={`content-${assessment.id}`}>Content: {assessment.title}</div>
  ),
}));

// Mock SheetWrapper to render a button that toggles visibility of its children.
vi.mock(
  "@/app/dashboard/components/sheet-wrapper",
  () => {
    const React = require("react") as typeof import("react");
    const SheetWrapper = ({
      trigger,
      headerTitle,
      children,
    }: {
      trigger: React.ReactNode;
      headerTitle: string;
      children: React.ReactNode;
    }) => {
      const [open, setOpen] = React.useState(false);
      return (
        <div>
          <div data-testid={`trigger-${headerTitle}`}>{trigger}</div>

          {/* controlled open button to simulate opening the sheet */}
          <button onClick={() => setOpen(true)} aria-label={`Open: ${headerTitle}`}>
            Open: {headerTitle}
          </button>

          {open && (
            <div aria-label={`Sheet: ${headerTitle}`}>
              <h2>{headerTitle}</h2>
              {children}
            </div>
          )}
        </div>
      );
    };
    return { SheetWrapper };
  }
);

const loadWithAssessments = async (assessments: Assessment[]) => {
  vi.resetModules();

  vi.doMock("@/lib/api/assesments", () => ({
    MentorAssessments: assessments,
  }));

  // Re-mock (stable) child modules after resetModules:
  vi.doMock("@/app/dashboard/assessments/components/assessment-card", () => ({
    AssessmentCard: ({ assessment }: { assessment: Assessment }) => (
      <div data-testid={`card-${assessment.id}`}>Card: {assessment.title}</div>
    ),
  }));
  vi.doMock("@/app/dashboard/assessments/components/assessment-content", () => ({
    AssessmentContent: ({ assessment }: { assessment: Assessment }) => (
      <div data-testid={`content-${assessment.id}`}>Content: {assessment.title}</div>
    ),
  }));
  vi.doMock(
    "@/app/dashboard/components/sheet-wrapper",
    () => {
      const React = require("react");
      const SheetWrapper = ({
        trigger,
        headerTitle,
        children,
      }: {
        trigger: React.ReactNode;
        headerTitle: string;
        children: React.ReactNode;
      }) => {
        const [open, setOpen] = React.useState(false);
        return (
          <div>
            <div data-testid={`trigger-${headerTitle}`}>{trigger}</div>
            <button onClick={() => setOpen(true)} aria-label={`Open: ${headerTitle}`}>
              Open: {headerTitle}
            </button>
            {open && (
              <div aria-label={`Sheet: ${headerTitle}`}>
                <h2>{headerTitle}</h2>
                {children}
              </div>
            )}
          </div>
        );
      };
      return { SheetWrapper };
    }
  );

  // Now import the AssessmentList after mocks are set
  const { AssessmentList } = await import(
    "@/app/dashboard/assessments/components/assessment-list"
  );
  return { AssessmentList };
};

describe("AssessmentList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders one trigger per assessment and shows the correct content when opened", async () => {
    const data = makeAssessments(3);
    const { AssessmentList } = await loadWithAssessments(data);

    render(<AssessmentList />);

    // Ensure each assessment renders a trigger (the trigger wrapper plus the card)
    for (const a of data) {
      expect(screen.getByTestId(`trigger-${a.title}`)).toBeInTheDocument();
      expect(screen.getByTestId(`card-${a.id}`)).toBeInTheDocument();
    }

    // Click open for the second assessment
    const target = data[1];
    await userEvent.click(screen.getByRole("button", { name: `Open: ${target.title}` }));

    // Sheet should appear with matching header and the correct content for that assessment
    expect(screen.getByLabelText(`Sheet: ${target.title}`)).toBeInTheDocument();
    expect(screen.getByText(target.title)).toBeInTheDocument(); // header
    expect(screen.getByTestId(`content-${target.id}`)).toHaveTextContent(`Content: ${target.title}`);
  });

  it("renders nothing when there are no assessments", async () => {
    const { AssessmentList } = await loadWithAssessments([]);

    render(<AssessmentList />);

    // No open buttons at all
    expect(screen.queryByRole("button", { name: /Open:/i })).not.toBeInTheDocument();
  });
});