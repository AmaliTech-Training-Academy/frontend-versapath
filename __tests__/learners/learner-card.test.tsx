// __tests__/mentor/learner-card.test.tsx
import React, { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LearnerCard } from "@/app/dashboard/learners/components/learner-card";
import type { MentorLearner } from "@/lib/api/use-mentor-learner";

// Mock next/image as a plain <img />
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}));

const learner: MentorLearner = {
  userId: "u_123",
  email: "jane.doe@example.com",
  firstName: "Jane",
  lastName: "Doe",
};

describe("LearnerCard", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders learner full name, role label, and email", () => {
    render(<LearnerCard learner={learner} data-testid="card" />);
    expect(screen.getByTestId("card")).toBeInTheDocument();

    // Full name
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    // Role label
    expect(screen.getByText("Learner")).toBeInTheDocument();
    // Email
    expect(screen.getByText("jane.doe@example.com")).toBeInTheDocument();
  });

  it("uses the learner name as Image alt text", () => {
    render(<LearnerCard learner={learner} />);
    // next/image is mocked to <img>, so alt is accessible
    const img = screen.getByAltText("Jane Doe");
    expect(img).toBeInTheDocument();
  });

  it("applies base styles; adds hover styles when hover prop is true; merges custom className", () => {
    const { rerender } = render(
      <LearnerCard learner={learner} data-testid="card" />
    );
    const card = screen.getByTestId("card");
    expect(card.className).toContain("rounded-xl");
    expect(card.className).toContain("border-gray-stroke-weak");
    expect(card.className).toContain("bg-base-white");
    expect(card.className).toContain("p-5");
    // No hover classes by default
    expect(card.className).not.toContain("hover:border-brand-primary-text-weak");
    expect(card.className).not.toContain("hover:bg-brand-primary-fill");

    rerender(
      <LearnerCard
        learner={learner}
        hover
        className="custom-class"
        data-testid="card"
      />
    );
    const cardWithHover = screen.getByTestId("card");
    expect(cardWithHover.className).toContain("hover:border-brand-primary-text-weak");
    expect(cardWithHover.className).toContain("hover:bg-brand-primary-fill");
    expect(cardWithHover.className).toContain("custom-class");
  });

  it("forwards ref to the outer div", () => {
    const ref = createRef<HTMLDivElement>();
    render(<LearnerCard ref={ref} learner={learner} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    // sanity: should still have base class on the ref element
    expect(ref.current!.className).toContain("rounded-xl");
  });

  it("passes through DOM props (e.g., onClick)", () => {
    const onClick = vi.fn();
    render(
      <LearnerCard learner={learner} onClick={onClick} data-testid="card" />
    );
    fireEvent.click(screen.getByTestId("card"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});