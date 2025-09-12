import { render, screen, fireEvent } from "@testing-library/react";
import { signOut } from "next-auth/react";
import { AppSidebar } from "@/components/custom/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import "@testing-library/jest-dom/vitest";

// Mock window.matchMedia
const mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Add matchMedia to window
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: mockMatchMedia,
});

// Add innerWidth to window
Object.defineProperty(window, "innerWidth", {
  writable: true,
  value: 1024, // Desktop width
});

// Mock next-auth sign out
vi.mock("next-auth/react", () => ({
  signOut: vi.fn(),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} alt={props.alt || "image"} />;
  },
}));

const renderWithSidebarProvider = (component: React.ReactNode) => {
  return render(
    <SidebarProvider defaultOpen={true}>{component}</SidebarProvider>
  );
};

describe("Logout Functionality", () => {
  beforeEach(() => {
    // Clear mock function calls before each test
    vi.clearAllMocks();
  });

  it("should render the user options button", () => {
    renderWithSidebarProvider(<AppSidebar />);
    const userOptionsButton = screen.getByRole("button", {
      name: "User options",
    });
    expect(userOptionsButton).toBeInTheDocument();
  });

  it("should call signOut when clicking the sign out button", async () => {
    renderWithSidebarProvider(<AppSidebar />);

    // Find and click the more options button that opens the popover
    const moreButton = screen.getByRole("button", {
      name: "User options",
    });
    fireEvent.click(moreButton);

    // Wait for the sign out button to be visible in the popover
    const signOutButton = await screen.findByRole("button", {
      name: "Sign out",
    });

    // Click the sign out button
    fireEvent.click(signOutButton);

    // Verify signOut was called with correct parameters
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith({ redirectTo: "/login" });
  });
});
