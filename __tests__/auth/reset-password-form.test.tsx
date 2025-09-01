import { vi, expect } from "vitest";
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
}));
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ResetPasswordForm } from "@/app/(auth)/reset-password/component/reset-password-form";

const renderResetPasswordForm = () => render(<ResetPasswordForm />);

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
}const fillForm = (email: string) => {
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: email },
  });
};

describe("ResetPasswordForm", () => {
  it("renders email field and submit button", () => {
    renderResetPasswordForm();
    expect(screen.getByText("Reset Password")).toBeInTheDocument();
    expect(
      screen.getByText("Enter the email address associated with your account")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(getSubmitButton()).toBeInTheDocument();
  });

  it("shows validation errors for empty email field", async () => {
    renderResetPasswordForm();
    fireEvent.click(getSubmitButton());
    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
  });


  it("accepts valid email format", async () => {
    renderResetPasswordForm();
    fillForm("test@example.com");
    fireEvent.click(getSubmitButton());
    await waitFor(() => {
      expect(
        screen.queryByText(/Please enter a valid email address/i)
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
    });
  });

  it("enables submit button when form is valid", () => {
    renderResetPasswordForm();
    fillForm("test@example.com");

    const submitButton = getSubmitButton();
    expect(submitButton).not.toBeDisabled();
  });
});
