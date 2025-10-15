import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { GrowthTrackInfo } from "@/app/dashboard/learners/components/growth-track-info";
import { SKillStatus, type MyTrack } from "@/lib/types/api";

vi.mock("next-auth/react", () => ({
    useSession: () => ({
        data: {
            user: { firstName: "Alice", lastName: "Wong" },
        },
        status: "authenticated",
    }),
}));

describe("GrowthTrackInfo", () => {
    beforeEach(() => vi.clearAllMocks());

    const makeTrack = (overrides: Partial<MyTrack> = {}): MyTrack => ({
        trackProgressId: "tp_1",
        trackId: "t_1",
        trackName: "Frontend Foundations",
        description: "Basics for web UI development",
        sequenceOrder: 1,
        status: SKillStatus.IN_PROGRESS,
        progressPercentage: 72,
        isUnlocked: true,
        capsules: [
            {
                capsuleProgressId: "cp_1",
                capsuleId: "c_1",
                capsuleName: "HTML & Semantics",
                description: "Learn proper HTML",
                sequenceOrder: 1,
                status: SKillStatus.COMPLETED,
                progressPercentage: 100,
                isUnlocked: true,
            },
            {
                capsuleProgressId: "cp_2",
                capsuleId: "c_2",
                capsuleName: "CSS Basics",
                description: "Select, style, and layout",
                sequenceOrder: 2,
                status: SKillStatus.IN_PROGRESS,
                progressPercentage: 50,
                isUnlocked: true,
            },
            {
                capsuleProgressId: "cp_3",
                capsuleId: "c_3",
                capsuleName: "JavaScript Essentials",
                description: "JS fundamentals",
                sequenceOrder: 3,
                status: SKillStatus.NOT_STARTED,
                progressPercentage: 0,
                isUnlocked: false,
            },
        ],
        ...overrides,
    });

    it("renders nothing if track is undefined", () => {
        const { container } = render(<GrowthTrackInfo track={undefined} />);
        expect(container).toBeEmptyDOMElement();
    });

    it("renders header, current track, mentor from session, manager, skills completed, and progress", () => {
        const track = makeTrack({ trackName: "React Fundamentals", progressPercentage: 45 });
        render(<GrowthTrackInfo track={track} />);

        // Header & subtitle
        expect(screen.getByText("Growth Track")).toBeInTheDocument();
        expect(
            screen.getByText("Current learning path and skill development")
        ).toBeInTheDocument();

        // Current Track
        expect(screen.getByText("Current Track")).toBeInTheDocument();
        expect(screen.getByText("React Fundamentals")).toBeInTheDocument();

        // Assigned Mentor (from next-auth useSession)
        expect(screen.getByText("Assigned Mentor")).toBeInTheDocument();
        expect(screen.getByText("Alice Wong")).toBeInTheDocument();

        // Manager (hardcoded)
        expect(screen.getByText("Manager")).toBeInTheDocument();
        expect(screen.getByText("Charles Ndayisaba")).toBeInTheDocument();

        // Skills Completed: 1 completed capsule in default data
        expect(screen.getByText("Skills Completed")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();

        // Progress text
        expect(screen.getByText("Current Progress")).toBeInTheDocument();
        expect(screen.getByText("45% complete")).toBeInTheDocument();
    });

    it("computes skills completed correctly from capsule statuses", () => {
        const track = makeTrack({
            capsules: [
                {
                    capsuleProgressId: "cp_1",
                    capsuleId: "c_1",
                    capsuleName: "A",
                    description: "",
                    sequenceOrder: 1,
                    status: SKillStatus.COMPLETED,
                    progressPercentage: 100,
                    isUnlocked: true,
                },
                {
                    capsuleProgressId: "cp_2",
                    capsuleId: "c_2",
                    capsuleName: "B",
                    description: "",
                    sequenceOrder: 2,
                    status: SKillStatus.COMPLETED,
                    progressPercentage: 100,
                    isUnlocked: true,
                },
                {
                    capsuleProgressId: "cp_3",
                    capsuleId: "c_3",
                    capsuleName: "C",
                    description: "",
                    sequenceOrder: 3,
                    status: SKillStatus.IN_PROGRESS,
                    progressPercentage: 30,
                    isUnlocked: true,
                },
            ],
        });

        render(<GrowthTrackInfo track={track} />);
        // Completed = 2
        expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("applies inline width matching progressPercentage", () => {
        const track = makeTrack({ progressPercentage: 73 });
        const { container } = render(<GrowthTrackInfo track={track} />);

        expect(screen.getByText("73% complete")).toBeInTheDocument();

        const innerBar = Array.from(container.querySelectorAll("div")).find(
            (el) =>
                el instanceof HTMLDivElement &&
                el.className.includes("bg-green-text") &&
                el.className.includes("absolute")
        ) as HTMLDivElement | undefined;

        expect(innerBar).toBeTruthy();
        expect(innerBar!.style.width).toBe("73%");
    });
});