import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { CreateNewPasswordForm } from "@/app/(auth)/reset-password/component/create-password-form";
import { toast } from "sonner";
import { authApi } from "@/lib/api/reset-password";

// Helpers
const renderForm = () => render(<CreateNewPasswordForm />);

const getSubmitButton = () => {
  const btn = screen
    .getAllByRole("button")
    .find((b) => b.getAttribute("type") === "submit");
  if (!btn) throw new Error("Submit button not found");
  return btn;
};

const fillForm = (password: string, confirmPassword: string) => {
  fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
    target: { value: password },
  });
  fireEvent.change(screen.getByPlaceholderText(/Confirm your password/i), {
    target: { value: confirmPassword },
  });
};

// Mocks
vi.mock("@/lib/api/reset-password", () => ({
  authApi: { updatePassword: vi.fn() },
}));

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: (k: string) => (k === "reset" ? "mock-token" : null) }),
}));

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockUpdatePassword = vi.mocked(authApi.updatePassword);
const mockToast = toast;

describe("CreateNewPasswordForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders password fields and submit button", () => {
    renderForm();

    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm your password/i)).toBeInTheDocument();
    expect(getSubmitButton()).toBeInTheDocument();
  });

  it("shows required field errors", async () => {
    renderForm();
    fireEvent.click(getSubmitButton());

    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/confirm password is required/i)).toBeInTheDocument();
  });

  it("shows error if passwords do not match", async () => {
    renderForm();
    fillForm("password123", "different");
    fireEvent.click(getSubmitButton());

    expect(await screen.findByText(/passwords must match/i)).toBeInTheDocument();
  });

  it("calls API and redirects on success", async () => {
    mockUpdatePassword.mockResolvedValueOnce({ success: true, data: { message: "OK" } });

    renderForm();
    fillForm("password123", "password123");
    fireEvent.click(getSubmitButton());

    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith("mock-token", {
        password: "password123",
        confirmPassword: "password123",
      });
      expect(mockToast.success).toHaveBeenCalledWith(expect.stringMatching(/password/i));
    });

    vi.runAllTimers();

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("shows error toast on API failure", async () => {
    mockUpdatePassword.mockResolvedValueOnce({
      success: false,
      data: { message: "Something went wrong" },
    });

    renderForm();
    fillForm("password123", "password123");
    fireEvent.click(getSubmitButton());

    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalled();
      expect(mockToast.error).toHaveBeenCalledWith("Something went wrong");
    });
  });

  it("shows loading state while submitting", async () => {
    let resolveFn: any;
    const promise = new Promise((resolve) => (resolveFn = resolve));
    mockUpdatePassword.mockImplementation(() => promise as any);

    renderForm();
    fillForm("password123", "password123");
    fireEvent.click(getSubmitButton());

    expect(getSubmitButton()).toBeDisabled();
    expect(screen.getByText(/resetting password/i)).toBeInTheDocument();

    resolveFn({ success: true, data: { message: "OK" } });

    await waitFor(() => {
      expect(getSubmitButton()).not.toBeDisabled();
    });
  });
});
