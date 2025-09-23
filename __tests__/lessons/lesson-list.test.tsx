import { SkillAtomsList } from "@/app/dashboard/lessons/components/skill-atoms-list";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { atomApi } from "@/lib/api/skill-atom-api";
import { toast } from "sonner";
import { SkillAtom } from "@/lib/types/skill-atom";

// Mock dependencies
vi.mock("@/lib/api/skill-atom-api", () => ({
  atomApi: {
    deleteAtom: vi.fn(),
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, height, width }: any) => (
    <img
      src={src}
      alt={alt}
      height={height}
      width={width}
      data-testid="empty-state-image"
    />
  ),
}));

vi.mock("./skill-atom-card", () => ({
  SkillAtomCard: ({ skillatom, onDelete }: any) => (
    <div data-testid={`skill-atom-card-${skillatom.id}`}>
      <h3>{skillatom.name}</h3>
      <button onClick={onDelete} data-testid={`delete-${skillatom.id}`}>
        Delete {skillatom.name}
      </button>
    </div>
  ),
}));

// Simplified ConfirmDialog mock
vi.mock("@/components/custom/confirm-dialog", () => ({
  ConfirmDialog: ({ open, onConfirm, confirmLabel }: any) =>
    open ? (
      <div data-testid="confirm-dialog">
        <button onClick={onConfirm} data-testid="confirm-button">
          {confirmLabel || "Delete"}
        </button>
      </div>
    ) : null,
}));

describe("SkillAtomsList", () => {
  const mockSkillAtoms: SkillAtom[] = [
    {
      id: "atom-1",
      name: "JavaScript Fundamentals",
      description: "Learn JavaScript basics",
      objectives: "Understand JS concepts",
      estimatedHours: 8,
      status: "ACTIVE",
      createdAt: "2024-01-01T00:00:00Z",
      //   updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: "atom-2",
      name: "React Components",
      description: "Build React components",
      objectives: "Create reusable components",
      estimatedHours: 12,
      status: "ACTIVE",
      createdAt: "2024-01-02T00:00:00Z",
      //   updatedAt: '2024-01-02T00:00:00Z',
    },
  ];

  const mockCallbacks = {
    onView: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    onRefresh: vi.fn(),
  };

  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders skill atoms when data exists", () => {
      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);

      expect(screen.getByTestId("skill-atom-card-atom-1")).toBeInTheDocument();
      expect(screen.getByTestId("skill-atom-card-atom-2")).toBeInTheDocument();
      expect(screen.getByText("JavaScript Fundamentals")).toBeInTheDocument();
      expect(screen.getByText("React Components")).toBeInTheDocument();
    });

    it("shows empty state when no skill atoms provided", () => {
      render(<SkillAtomsList skillAtoms={[]} {...mockCallbacks} />);

      expect(screen.getByTestId("empty-state-image")).toBeInTheDocument();
      expect(screen.getByText("No Lesson found")).toBeInTheDocument();
      expect(screen.getByAltText("No skillAtom found")).toBeInTheDocument();
    });
  });

  describe("Delete Functionality", () => {
    it("opens confirm dialog when delete is clicked", async () => {
      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);

      const deleteButton = screen.getByTestId("atom-1");
      await user.click(deleteButton);

      expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();
    });

    it("successfully deletes atom when confirmed", async () => {
      vi.mocked(atomApi.deleteAtom).mockResolvedValue({ success: true });

      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);

      // Click delete button
      const deleteButton = screen.getByTestId("atom-1");
      await user.click(deleteButton);

      // Confirm deletion
      const confirmButton = screen.getByTestId("confirm-button");
      await user.click(confirmButton);

      await waitFor(() => {
        expect(atomApi.deleteAtom).toHaveBeenCalledWith("atom-1");
        expect(mockCallbacks.onDelete).toHaveBeenCalledWith("atom-1");
        expect(toast.success).toHaveBeenCalledWith(
          "Lesson deleted successfully"
        );
        expect(mockCallbacks.onRefresh).toHaveBeenCalled();
      });
    });

    it("handles deletion error gracefully", async () => {
      vi.mocked(atomApi.deleteAtom).mockRejectedValue(new Error("API Error"));

      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);

      const deleteButton = screen.getByTestId("atom-1");
      await user.click(deleteButton);

      const confirmButton = screen.getByTestId("confirm-button");
      await user.click(confirmButton);

      await waitFor(() => {
        expect(atomApi.deleteAtom).toHaveBeenCalledWith("atom-1");
        expect(toast.success).toHaveBeenCalledWith(
          "Lesson deleted successfully"
        );
      });
    });

    it("shows loading state during deletion", async () => {
      // Mock slow API response
      vi.mocked(atomApi.deleteAtom).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ success: true }), 100)
          )
      );

      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);

      const deleteButton = screen.getByTestId("atom-1");
      await user.click(deleteButton);

      const confirmButton = screen.getByTestId("confirm-button");
      await user.click(confirmButton);

      // Check for loading text
      expect(screen.getByText("Deleting...")).toBeInTheDocument();

      await waitFor(
        () => {
          expect(
            screen.queryByTestId("confirm-dialog")
          ).not.toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });
  });

  describe("Optional Props", () => {
    it("works without callback props", () => {
      render(<SkillAtomsList skillAtoms={mockSkillAtoms} />);

      console.log(screen.debug());
      expect(screen.getByTestId("skill-atom-card-atom-1")).toBeInTheDocument();
      expect(screen.getByTestId("skill-atom-card-atom-2")).toBeInTheDocument();
    });

    it("works with empty skillAtoms array", () => {
      render(<SkillAtomsList skillAtoms={[]} />);

      expect(screen.getByText("No Lesson found")).toBeInTheDocument();
      expect(
        screen.queryByTestId("skill-atom-card-atom-1")
      ).not.toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles single skill atom", () => {
      const singleAtom = [mockSkillAtoms[0]];

      render(<SkillAtomsList skillAtoms={singleAtom} {...mockCallbacks} />);

      expect(screen.getByTestId("skill-atom-card-atom-1")).toBeInTheDocument();
      expect(
        screen.queryByTestId("skill-atom-card-atom-2")
      ).not.toBeInTheDocument();
    });

    it("closes dialog without deletion when cancelled", async () => {
      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);
      expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();
    });
  });
});
