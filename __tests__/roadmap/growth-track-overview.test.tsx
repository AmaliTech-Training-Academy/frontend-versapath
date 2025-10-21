import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { GrowthTrackOverview } from "@/app/dashboard/roadmap/components/growth-track-overview";
import { SKillStatus } from "@/lib/types/api";

vi.mock("@/components/ui/progress", () => ({
    Progress: ({ value, ...rest }: any) => (
        <div role="progressbar" aria-valuenow={value} {...rest} />
    ),
}));

// Helper to make a track-like object
const makeTrack = (overrides: Partial<any> = {}): any => ({
    trackProgressId: "tp_1",
    trackId: "t_1",
    trackName: "Frontend Foundations",
    description:
        "Basics for web UI development. Learn layout, forms, and accessibility. Extra sentence ignored.",
    sequenceOrder: 1,
    status: SKillStatus.IN_PROGRESS,
    progressPercentage: 42,
    isUnlocked: true,
    capsules: [],
    ...overrides,
});

describe("GrowthTrackOverview", () => {
    beforeEach(() => vi.clearAllMocks());

    it("renders track name, first two sentences of description, and progress", () => {
        const track = makeTrack();
        render(<GrowthTrackOverview track={track} />);

        // Name
        expect(
            screen.getByText(/frontend foundations/i)
        ).toBeInTheDocument();

        // Only first two sentences should appear with a trailing period
        expect(
            screen.getByText(
                "Basics for web UI development. Learn layout, forms, and accessibility."
            )
        ).toBeInTheDocument();
        expect(
            screen.queryByText(/extra sentence ignored/i)
        ).not.toBeInTheDocument();

        // Progress number and progressbar
        expect(screen.getByText(/42%/)).toBeInTheDocument();
        const bar = screen.getByRole("progressbar");
        expect(bar).toHaveAttribute("aria-valuenow", "42");
    });

    it("always ends the description with a period when there is only one sentence", () => {
        const track = makeTrack({ description: "Single sentence only" });
        render(<GrowthTrackOverview track={track} />);

        expect(screen.getByText("Single sentence only.")).toBeInTheDocument();
    });

    it("keeps exactly two sentences even if the original had trailing periods and spaces", () => {
        const track = makeTrack({
            description: "Intro.  Second sentence with space.  Third should not show.",
        });
        render(<GrowthTrackOverview track={track} />);

        expect(
            screen.getByText("Intro. Second sentence with space.")
        ).toBeInTheDocument();
        expect(screen.queryByText(/third should not show/i)).not.toBeInTheDocument();
    });
});