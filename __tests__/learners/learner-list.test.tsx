import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LearnerList } from "@/app/dashboard/learners/components/learner-list";

vi.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} />;
    },
}));

vi.mock("next-auth/react", () => ({
    useSession: () => ({
        data: {
            user: {
                userId: "mentor-123",
                role: "MENTOR",
                firstName: "Mia",
                lastName: "Mentor",
                email: "mia@example.com",
            },
        },
        status: "authenticated",
    }),
}));

vi.mock("@/lib/api/use-mentor-learner", async () => {
    return {
        useMentorLearners: vi.fn(),
    };
});

vi.mock("@/app/dashboard/learners/components/learner-content", () => ({
    LearnerContent: ({ learner }: any) => (
        <div data-testid="mock-learner-content">MockLearnerContent: {learner.firstName}</div>
    ),
}));

// Helper to set the return value of useMentorLearners
import { useMentorLearners as useMentorLearnersMock } from "@/lib/api/use-mentor-learner";

describe("LearnerList", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders a loading state while fetching", () => {
        (useMentorLearnersMock as vi.Mock).mockReturnValue({
            learners: [],
            loading: true,
            error: null,
        });

        render(<LearnerList />);

        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    it("renders an error UI when the hook returns an error", () => {
        (useMentorLearnersMock as vi.Mock).mockReturnValue({
            learners: [],
            loading: false,
            error: "Failed to load learners",
        });

        render(<LearnerList />);

        expect(screen.getByText(/failed to load learners/i)).toBeInTheDocument();
        // The component also shows an error illustration image
        expect(screen.getByAltText(/error loading learner list/i)).toBeInTheDocument();
    });

    it("renders a grid of learner cards as sheet triggers", () => {
        (useMentorLearnersMock as vi.Mock).mockReturnValue({
            learners: [
                { userId: "l1", email: "a@example.com", firstName: "Alice", lastName: "Wong" },
                { userId: "l2", email: "b@example.com", firstName: "Bob", lastName: "Karemera" },
            ],
            loading: false,
            error: null,
        });

        render(<LearnerList />);

        // Names come from the LearnerCard rendered inside the trigger
        expect(screen.getByText(/alice wong/i)).toBeInTheDocument();
        expect(screen.getByText(/bob karemera/i)).toBeInTheDocument();
    });

    it("opens the sheet and shows learner content when a card is clicked", async () => {
        (useMentorLearnersMock as vi.Mock).mockReturnValue({
            learners: [
                { userId: "l1", email: "a@example.com", firstName: "Alice", lastName: "Wong" },
                { userId: "l2", email: "b@example.com", firstName: "Bob", lastName: "Karemera" },
            ],
            loading: false,
            error: null,
        });

        const user = userEvent.setup();
        render(<LearnerList />);

        // Click the first learner card (our mock SheetWrapper opens on any click inside the trigger)
        await user.click(screen.getByText(/alice wong/i));

        // Radix renders a dialog for the sheet content
        expect(await screen.findByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText(/learner details/i)).toBeInTheDocument();
        expect(screen.getByText(/MockLearnerContent: Alice/i)).toBeInTheDocument();

    });
});