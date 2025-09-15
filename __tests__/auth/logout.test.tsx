import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((q: string) => ({
    matches: false,
    media: q,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window, "innerWidth", {
  writable: true,
  value: 1024,
});

vi.mock("@/lib/types", () => ({
  Roles: { ADMIN: "ADMIN", MANAGER: "MANAGER", MENTOR: "MENTOR", LEARNER: "LEARNER" },
}));

// Mock next/router
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock next/image to plain <img>
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt || "image"} />,
}));

// Mock next-auth: useSession + signOut
const signOutMock = vi.fn();
vi.mock("next-auth/react", () => ({
  __esModule: true,
  useSession: () => ({
    data: {
      user: {
        firstName: "Bob",
        lastName: "Shema",
        email: "bob@example.com",
        role: "ADMIN",
      },
    },
    status: "authenticated",
  }),
  signOut: (...args: any[]) => signOutMock(...args),
}));

// Mock the confirm dialog to render simple buttons when open
vi.mock("@/components/custom/confirm-dialog", () => ({
  ConfirmDialog: ({
    open,
    title,
    description,
    confirmLabel,
    alternativeLabel,
    onConfirm,
    onAlternative,
  }: any) =>
    open ? (
      <dialog open aria-label={title}>
        <p>{description}</p>
        <button onClick={onAlternative}>{alternativeLabel}</button>
        <button onClick={onConfirm}>{confirmLabel}</button>
      </dialog>
    ) : null,
}));

// Mock CustomPopover to render trigger and its children
vi.mock("@/components/custom/custom-popover", () => ({
  CustomPopover: ({ trigger, children }: any) => (
    <div>
      {trigger}
      <div data-testid="popover-content">{children}</div>
    </div>
  ),
}));

// Mock handleLogOut to invoke signOut
vi.mock("@/lib/api/logout", async () => {
  // Import the mocked signOut from next-auth/react
  const mod = await import("next-auth/react");
  return {
    handleLogOut: vi.fn(async () => {
      await mod.signOut({ redirectTo: "/login" });
      return { success: true };
    }),
  };
});

import { AppSidebar } from "@/components/custom/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const renderWithProvider = (ui: React.ReactNode) =>
  render(<SidebarProvider defaultOpen={true}>{ui}</SidebarProvider>);

/** ---- TESTS ---- */
describe("Logout flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the user options button", () => {
    renderWithProvider(<AppSidebar />);
    expect(
      screen.getByRole("button", { name: "User options" })
    ).toBeInTheDocument();
  });

  it("logs out after confirming in the dialog", async () => {
    renderWithProvider(<AppSidebar />);

    // 1) Open the popover
    fireEvent.click(screen.getByRole("button", { name: /user options/i }));

    // 2) Click the *popover* Logout
    const popover = await screen.findByTestId("popover-content");
    const popoverLogout = within(popover).getByRole("button", { name: /logout/i });
    fireEvent.click(popoverLogout);

    // 3) Now confirm in the dialog
    const dialog = await screen.findByRole("dialog", { name: /logout/i });
    const confirmLogout = within(dialog).getByRole("button", { name: /logout/i });
    fireEvent.click(confirmLogout);

    expect(signOutMock).toHaveBeenCalledTimes(1);
    expect(signOutMock).toHaveBeenCalledWith({ redirectTo: "/login" });
  });
});