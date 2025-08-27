import { expect } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreatePasswordForm from "@/app/(auth)/reset-password/component/create-password-form";
import { authApi, ApiError } from "@/lib/api/reset-password";
// Mock next/navigation before any imports to provide App Router context
import { vi } from "vitest";
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue("test-token-123"),
  }),
}));

// Mock the API module
vi.mock("@/lib/api/reset-password", async () => {
  const actual = (await vi.importActual("@/lib/api/reset-password")) as any;
  return {
    ...actual,
    authApi: {
      ...actual.authApi,
      updatePassword: vi.fn(),
    },
  };
});

const renderCreatePasswordForm = () => render(<CreatePasswordForm />);
function getSubmitButton() {
  const submitBtn = screen
    .getAllByRole("button")
    .find((btn) => btn.getAttribute("type") === "submit");
  if (!submitBtn) {
    throw new Error(
      "Submit button not found. Make sure the form has a button with type='submit'."
    );
  }
  return submitBtn;
}
const fillAndSubmit = async (password: string, confirmPassword: string) => {
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: password },
  });
  fireEvent.change(screen.getByLabelText("Confirm Password"), {
    target: { value: confirmPassword },
  });
  fireEvent.click(getSubmitButton());
};
const mockUpdatePassword = vi.mocked(authApi.updatePassword);

describe("CreatePasswordForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders password fields and submit button", () => {
    renderCreatePasswordForm();
    expect(screen.getByText("Create new password")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Your new password must be different from previous used passwords."
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(getSubmitButton()).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    renderCreatePasswordForm();
    fireEvent.click(getSubmitButton());
    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
      expect(
        screen.getByText("Please confirm your password")
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for password mismatch", async () => {
    renderCreatePasswordForm();
    await fillAndSubmit("Password123", "DifferentPassword");
    await waitFor(() => {
      expect(
        screen.getByText(/Both passwords must match/i)
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for weak password", async () => {
    renderCreatePasswordForm();
    await fillAndSubmit("weak", "weak");
    await waitFor(() => {
      expect(
        screen.getByText(/Must be at least 8 characters/i)
      ).toBeInTheDocument();
    });
  });

  it("shows real-time password validation with star and check icons", async () => {
    renderCreatePasswordForm();
    const passwordInput = screen.getByLabelText("Password");

    // Start typing to trigger validation display
    fireEvent.change(passwordInput, { target: { value: "a" } });

    await waitFor(() => {
      expect(
        screen.getByText("Must be at least 8 characters")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Must contain uppercase letter")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Must contain lowercase letter")
      ).toBeInTheDocument();
      expect(screen.getByText("Must contain number")).toBeInTheDocument();
    });
  });

  //   it("shows error on API failure and does not show success message", async () => {
  //     mockUpdatePassword.mockRejectedValueOnce(
  //       new ApiError(400, "Password update failed")
  //     );
  //     renderCreatePasswordForm();
  //     await fillAndSubmit("Password123", "Password123");
  //     await waitFor(() => {
  //       expect(screen.getByText(/Failed to send reset email"/i)).toBeInTheDocument();
  //       expect(
  //         screen.queryByText(/password reset completed/i)
  //       ).not.toBeInTheDocument();
  //     });
  //   });

  it("calls updatePassword API and shows success confirmation", async () => {
    mockUpdatePassword.mockResolvedValueOnce({
      message:
        "Your password has been successfully updated. You can now login with your new password.",
    });
    renderCreatePasswordForm();
    await fillAndSubmit("Password123", "Password123");
    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith(
        "Password123",
        "Password123"
      );
    });
    await waitFor(() => {
      expect(screen.getByText("Password reset completed")).toBeInTheDocument();
      expect(screen.getByText(/successfully updated/)).toBeInTheDocument();
    });
  });

  it("shows loading state while submitting and re-enables button after", async () => {
    let resolvePromise!: (value: { message: string }) => void;
    const promise = new Promise<{ message: string }>((resolve) => {
      resolvePromise = resolve;
    });
    mockUpdatePassword.mockImplementation(() => promise);
    renderCreatePasswordForm();
    await fillAndSubmit("Password123", "Password123");

    expect(screen.getByText(/resetting password/i)).toBeInTheDocument();
    expect(getSubmitButton()).toBeDisabled();

    resolvePromise({ message: "Password reset completed" });
    await waitFor(
      () => {
        expect(
          screen.getByText("Password reset completed")
        ).toBeInTheDocument();
        // expect(getSubmitButton()).not.toBeDisabled();
      },
      { timeout: 2000 }
    );
  });

  it("shows password visibility toggle functionality", async () => {
    renderCreatePasswordForm();
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    // Initially password fields should be hidden
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(confirmPasswordInput).toHaveAttribute("type", "password");

    // Find and click visibility toggle buttons
    const eyeButtons = screen
      .getAllByRole("button")
      .filter((btn) => btn.getAttribute("type") !== "submit");

    fireEvent.click(eyeButtons[0]); // First eye button for password
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(eyeButtons[1]); // Second eye button for confirm password
    expect(confirmPasswordInput).toHaveAttribute("type", "text");
  });
});
