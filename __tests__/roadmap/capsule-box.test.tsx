import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CapsuleBox } from "@/app/dashboard/roadmap/components/capsule-box";
import { SKillStatus } from "@/lib/types/api";

vi.mock("@/components/ui/button", () => ({
    Button: ({ children, ...rest }: any) => <button {...rest}>{children}</button>,
}));

vi.mock("@/components/ui/progress", () => ({
    Progress: ({ value, ...rest }: any) => (
        <div role="progressbar" aria-valuenow={value} {...rest} />
    ),
}));

vi.mock("@/components/ui/separator", () => ({
    Separator: (props: any) => <hr {...props} />,
}));

vi.mock("next/link", () => ({
    __esModule: true,
    default: ({ href, children, ...rest }: any) => (
        <a href={typeof href === 'string' ? href : ''} {...rest}>
            {children}
        </a>
    ),
}));

vi.mock("lucide-react", () => ({
    Check: () => <svg data-testid="check-icon" />,
}));

// Helper to make a capsule
const makeCapsule = (overrides: Partial<import("@/lib/types/api").MyTrackCapsule> = {}) => ({
    capsuleProgressId: "cp_1",
    capsuleId: "caps_123",
    capsuleName: "Intro to React",
    description: "Build UI with components, props, and state.",
    sequenceOrder: 1,
    status: SKillStatus.NOT_STARTED,
    progressPercentage: 0,
    isUnlocked: true,
    ...overrides,
});

describe("CapsuleBox", () => {
    beforeEach(() => vi.clearAllMocks());

    it("renders name and description", () => {
        const capsule = makeCapsule();
        render(
            <CapsuleBox capsule={capsule} isActive={false} isNextInline={false} />
        );

        expect(
            screen.getByText(/intro to react/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/build ui with components/i)
        ).toBeInTheDocument();
    });

    it("NOT_STARTED and next inline + active → shows progress and Start button", async () => {
        const capsule = makeCapsule({ status: SKillStatus.NOT_STARTED, progressPercentage: 0 });

        render(
            <CapsuleBox capsule={capsule} isActive={true} isNextInline={true} />
        );

        // progress visible due to (isNextInline && isActive)
        expect(screen.getByText("0%"));
        const bar = screen.getByRole("progressbar");
        expect(bar).toHaveAttribute("aria-valuenow", "0");

        const startBtn = screen.getByRole("button", { name: /start/i });
        expect(startBtn).toBeInTheDocument();

        const link = startBtn.closest("a");
        expect(link).toHaveAttribute("href", "/dashboard/skills/caps_123");

        // No Learn More / Resume / Retake
        expect(screen.queryByRole("button", { name: /learn more/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /resume/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /retake/i })).not.toBeInTheDocument();
    });

    it("NOT_STARTED but not next inline → shows Learn More and hides progress", () => {
        const capsule = makeCapsule({ status: SKillStatus.NOT_STARTED });

        render(
            <CapsuleBox capsule={capsule} isActive={false} isNextInline={false} />
        );

        // No progress shown
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

        // Learn More with link
        const learnBtn = screen.getByRole("button", { name: /learn more/i });
        expect(learnBtn).toBeInTheDocument();
        const link = learnBtn.closest("a");
        expect(link).toHaveAttribute("href", "/dashboard/skills/caps_123");

        // No Start/Resume/Retake
        expect(screen.queryByRole("button", { name: /start/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /resume/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /retake/i })).not.toBeInTheDocument();
    });

    it("IN_PROGRESS → shows progress and Resume button", () => {
        const capsule = makeCapsule({ status: SKillStatus.IN_PROGRESS, progressPercentage: 47 });

        render(
            <CapsuleBox capsule={capsule} isActive={false} isNextInline={false} />
        );

        expect(screen.getByText("47%"));
        const bar = screen.getByRole("progressbar");
        expect(bar).toHaveAttribute("aria-valuenow", "47");

        const resume = screen.getByRole("button", { name: /resume/i });
        expect(resume).toBeInTheDocument();
        const link = resume.closest("a");
        expect(link).toHaveAttribute("href", "/dashboard/skills/caps_123");

        // No Start/Learn More/Retake
        expect(screen.queryByRole("button", { name: /start/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /learn more/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /retake/i })).not.toBeInTheDocument();
    });

    it("COMPLETED → shows badge and Retake button; no progress", () => {
        const capsule = makeCapsule({ status: SKillStatus.COMPLETED, progressPercentage: 100 });

        render(
            <CapsuleBox capsule={capsule} isActive={false} isNextInline={false} />
        );

        // Completed badge
        expect(screen.getByText(/completed/i)).toBeInTheDocument();
        expect(screen.getByTestId("check-icon")).toBeInTheDocument();

        // Retake
        const retake = screen.getByRole("button", { name: /retake/i });
        const link = retake.closest("a");
        expect(link).toHaveAttribute("href", "/dashboard/skills/caps_123");

        // No progress in completed state
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

        // No Start/Resume/Learn More
        expect(screen.queryByRole("button", { name: /start/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /resume/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /learn more/i })).not.toBeInTheDocument();
    });
});