import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { RoadmapTimeline } from "@/app/dashboard/roadmap/components/roadmap-timeline";
import { SKillStatus } from "@/lib/types/api";

vi.mock("@/lib/utils", () => ({
  cn: (...cls: any[]) => cls.filter(Boolean).join(" "),
}));

// Helper to make capsule rows
const cap = (id: string, pct: number, name = id) => ({
  capsuleProgressId: `cp_${id}`,
  capsuleId: id,
  capsuleName: name,
  description: "",
  sequenceOrder: 1,
  status: pct === 100 ? SKillStatus.COMPLETED : pct > 0 ? SKillStatus.IN_PROGRESS : SKillStatus.NOT_STARTED,
  progressPercentage: pct,
  isUnlocked: true,
});

// Mock offsetHeight so the line height calculation can be tested deterministically
const setGlobalOffsetHeight = (value: number) => {
  Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
    configurable: true,
    get() {
      return value;
    },
  });
};

describe("RoadmapTimeline", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setGlobalOffsetHeight(1000);
  });

  it("marks the first non-100% capsule as nextInline and unlocks only when all previous are 100% (assert via Call To Actions)", () => {
    // 2 completed, then in-progress, then not started
    const capsules = [cap("c1", 100), cap("c2", 100), cap("c3", 60), cap("c4", 0)];

    render(<RoadmapTimeline capsules={capsules as any} />);

    // c1 and c2 completed → Retake buttons present
    expect(screen.getByText(/^c1$/)).toBeInTheDocument();
    expect(screen.getByText(/^c2$/)).toBeInTheDocument();
    const retakes = screen.getAllByRole("button", { name: /retake/i });
    expect(retakes.length).toBeGreaterThanOrEqual(2);

    // c3 in progress → Resume button present (this is the first non-100%)
    expect(screen.getByRole("button", { name: /resume/i })).toBeInTheDocument();

    // c4 locked because previous (c3) is not 100% → Learn More shown, Start not shown
    expect(screen.getByRole("button", { name: /learn more/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /start/i })).not.toBeInTheDocument();
  });

  it("sets line height to cover completed + next inline (capped at total)", () => {
    // 1 completed, next inline exists
    const capsules = [cap("c1", 100), cap("c2", 0), cap("c3", 0), cap("c4", 0)];
    const { container } = render(<RoadmapTimeline capsules={capsules as any} />);

    // Find the inner colored line DIV
    const inner = container.querySelector('[style*="height:"]') as HTMLDivElement;
    expect(inner).toBeTruthy();

    const h = 1000; // mocked offsetHeight
    const CARD_HALF = 163 / 2;
    const visibleCount = Math.min(1 + 1, capsules.length); // completed + next
    const ratio = visibleCount / capsules.length;
    const expected = Math.max(0, Math.min(h, h * ratio) - CARD_HALF);

    expect(inner.getAttribute("style") ?? "").toContain(`height: ${expected}px`);
  });

  it("when all capsules are completed: only Retake buttons are shown (no Start/Resume/Learn More)", () => {
    const capsules = [cap("c1", 100), cap("c2", 100), cap("c3", 100)];

    render(<RoadmapTimeline capsules={capsules as any} />);

    const retakes = screen.getAllByRole("button", { name: /retake/i });
    expect(retakes).toHaveLength(3);

    expect(screen.queryByRole("button", { name: /start/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /resume/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /learn more/i })).not.toBeInTheDocument();
  });
});