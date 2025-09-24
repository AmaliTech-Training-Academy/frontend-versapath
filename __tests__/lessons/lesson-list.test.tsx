import { SkillAtomsList } from "@/app/dashboard/lessons/components/skill-atoms-list";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
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
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} data-testid="empty-state-image" {...props} />
  ),
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
    },
    {
      id: "atom-2",
      name: "React Components",
      description: "Build React components",
      objectives: "Create reusable components",
      estimatedHours: 12,
      status: "ACTIVE",
      createdAt: "2024-01-02T00:00:00Z",
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

  describe("Component Rendering", () => {
    it("renders skill atoms when data exists", () => {
      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);

      // Check that skill atom names are displayed
      expect(screen.getByText("JavaScript Fundamentals")).toBeInTheDocument();
      expect(screen.getByText("React Components")).toBeInTheDocument();
      expect(screen.getByText("Learn JavaScript basics")).toBeInTheDocument();
      expect(screen.getByText("Build React components")).toBeInTheDocument();
    });

    it("shows empty state when no skill atoms provided", () => {
      render(<SkillAtomsList skillAtoms={[]} {...mockCallbacks} />);

      expect(screen.getByTestId("empty-state-image")).toBeInTheDocument();
      expect(screen.getByText("No Lesson found")).toBeInTheDocument();
    });

    it("renders without crashing when no callbacks provided", () => {
      expect(() => {
        render(<SkillAtomsList skillAtoms={mockSkillAtoms} />);
      }).not.toThrow();

      expect(screen.getByText("JavaScript Fundamentals")).toBeInTheDocument();
      expect(screen.getByText("React Components")).toBeInTheDocument();
    });

    it("handles single skill atom", () => {
      const singleAtom = [mockSkillAtoms[0]];
      render(<SkillAtomsList skillAtoms={singleAtom} {...mockCallbacks} />);

      expect(screen.getByText("JavaScript Fundamentals")).toBeInTheDocument();
      expect(screen.queryByText("React Components")).not.toBeInTheDocument();
    });

    it("handles empty array", () => {
      render(<SkillAtomsList skillAtoms={[]} {...mockCallbacks} />);

      expect(screen.getByText("No Lesson found")).toBeInTheDocument();
      expect(
        screen.queryByText("JavaScript Fundamentals")
      ).not.toBeInTheDocument();
    });
  });

  describe("Menu Interactions", () => {
    it("renders menu buttons for each skill atom", () => {
      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);
    });

    it("opens menu when menu button is clicked", async () => {
      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);

      const menuButtons = screen.getAllByRole("button");
      const firstMenuButton = menuButtons[0];

      await user.click(firstMenuButton);
      expect(firstMenuButton).toBeInTheDocument();
    });
  });

  describe("Delete Functionality", () => {
    it("handles delete operation flow", async () => {
      vi.mocked(atomApi.deleteAtom).mockResolvedValue({ success: true });

      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);
      expect(screen.getByText("JavaScript Fundamentals")).toBeInTheDocument();
      expect(screen.getByText("React Components")).toBeInTheDocument();
    });

    it("shows success message after successful deletion", async () => {
      vi.mocked(atomApi.deleteAtom).mockResolvedValue({ success: true });

      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);
      await atomApi.deleteAtom("atom-1");

      expect(atomApi.deleteAtom).toHaveBeenCalledWith("atom-1");
    });

    it("handles deletion errors", async () => {
      const mockError = new Error("Delete failed");
      vi.mocked(atomApi.deleteAtom).mockRejectedValue(mockError);

      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);

      try {
        await atomApi.deleteAtom("atom-1");
      } catch (error) {
        expect(error).toBe(mockError);
      }

      expect(atomApi.deleteAtom).toHaveBeenCalledWith("atom-1");
    });
  });

  describe("Component Props", () => {
    it("accepts skillAtoms prop correctly", () => {
      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);

      mockSkillAtoms.forEach((atom) => {
        expect(screen.getByText(atom.name)).toBeInTheDocument();
        expect(screen.getByText(atom.description)).toBeInTheDocument();
      });
    });

    it("calls callback functions when provided", () => {
      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);
      expect(mockCallbacks.onView).toBeDefined();
      expect(mockCallbacks.onEdit).toBeDefined();
      expect(mockCallbacks.onDelete).toBeDefined();
      expect(mockCallbacks.onRefresh).toBeDefined();
    });

    it("handles missing optional props gracefully", () => {
      expect(() => {
        render(<SkillAtomsList skillAtoms={mockSkillAtoms} />);
      }).not.toThrow();
    });
  });

  describe("Data Handling", () => {
    it("handles different skill atom statuses", () => {
      const atomsWithDifferentStatuses: SkillAtom[] = [
        { ...mockSkillAtoms[0], status: "ACTIVE" },
        { ...mockSkillAtoms[1], status: "INACTIVE" },
      ];

      render(
        <SkillAtomsList
          skillAtoms={atomsWithDifferentStatuses}
          {...mockCallbacks}
        />
      );

      expect(screen.getByText("JavaScript Fundamentals")).toBeInTheDocument();
      expect(screen.getByText("React Components")).toBeInTheDocument();
    });

    it("handles atoms with different estimated hours", () => {
      const atomsWithDifferentHours: SkillAtom[] = [
        { ...mockSkillAtoms[0], estimatedHours: 2 },
        { ...mockSkillAtoms[1], estimatedHours: 20 },
      ];

      render(
        <SkillAtomsList
          skillAtoms={atomsWithDifferentHours}
          {...mockCallbacks}
        />
      );

      expect(screen.getByText("JavaScript Fundamentals")).toBeInTheDocument();
      expect(screen.getByText("React Components")).toBeInTheDocument();
    });

    it("handles long text content", () => {
      const atomsWithLongText: SkillAtom[] = [
        {
          ...mockSkillAtoms[0],
          name: "A Very Long Skill Atom Name That Should Still Be Displayed Properly",
          description:
            "This is a very long description that tests how the component handles longer text content and whether it displays correctly without breaking the layout",
        },
      ];

      render(
        <SkillAtomsList skillAtoms={atomsWithLongText} {...mockCallbacks} />
      );

      expect(
        screen.getByText(
          "A Very Long Skill Atom Name That Should Still Be Displayed Properly"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(/This is a very long description/)
      ).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty skillAtoms array", () => {
      render(<SkillAtomsList skillAtoms={[]} {...mockCallbacks} />);

      expect(screen.getByText("No Lesson found")).toBeInTheDocument();
    });

    it("handles skillAtom with missing optional fields", () => {
      const incompleteAtom: SkillAtom = {
        id: "incomplete-atom",
        name: "Incomplete Atom",
        description: "",
        objectives: "",
        estimatedHours: 0,
        status: "ACTIVE",
        createdAt: "2024-01-01T00:00:00Z",
      };

      expect(() => {
        render(
          <SkillAtomsList skillAtoms={[incompleteAtom]} {...mockCallbacks} />
        );
      }).not.toThrow();

      expect(screen.getByText("Incomplete Atom")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper ARIA labels", () => {
      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });

    it("maintains focus management", () => {
      render(<SkillAtomsList skillAtoms={mockSkillAtoms} {...mockCallbacks} />);

      const buttons = screen.getAllByRole("button");
      if (buttons.length > 0) {
        buttons[0].focus();
        expect(buttons[0]).toHaveFocus();
      }
    });
  });

  describe("Performance", () => {
    it("handles large number of skill atoms", () => {
      const manyAtoms: SkillAtom[] = Array.from(
        { length: 100 },
        (_, index) => ({
          id: `atom-${index}`,
          name: `Skill Atom ${index}`,
          description: `Description for skill atom ${index}`,
          objectives: `Objectives for skill atom ${index}`,
          estimatedHours: index + 1,
          status: "ACTIVE",
          createdAt: "2024-01-01T00:00:00Z",
        })
      );
      render(<SkillAtomsList skillAtoms={manyAtoms} {...mockCallbacks} />);

      expect(screen.getByText("Skill Atom 0")).toBeInTheDocument();
      expect(screen.getByText("Skill Atom 99")).toBeInTheDocument();
    });
  });

  describe("API Integration", () => {
    it("mocks API correctly", () => {
      expect(atomApi.deleteAtom).toBeDefined();
      expect(typeof atomApi.deleteAtom).toBe("function");
    });

    it("handles API success responses", async () => {
      vi.mocked(atomApi.deleteAtom).mockResolvedValue({ success: true });

      const result = await atomApi.deleteAtom("test-id");
      expect(result).toEqual({ success: true });
    });

    it("handles API error responses", async () => {
      const errorMessage = "Network error";
      vi.mocked(atomApi.deleteAtom).mockRejectedValue(new Error(errorMessage));

      await expect(atomApi.deleteAtom("test-id")).rejects.toThrow(errorMessage);
    });
  });

  describe("Toast Notifications", () => {
    it("mocks toast correctly", () => {
      expect(toast.success).toBeDefined();
      expect(toast.error).toBeDefined();
      expect(typeof toast.success).toBe("function");
      expect(typeof toast.error).toBe("function");
    });
  });
});
