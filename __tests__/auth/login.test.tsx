import { expect } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "@/app/(auth)/login/components/login-form";
import { vi, type Mock } from "vitest";
import { toast } from "sonner";
import { apiLogin } from "@/lib/api/login";

// Create a wrapper component with necessary providers
const renderLoginForm = () => render(<LoginForm />);

// Helper to fill and submit the form
function getSubmitButton() {
  // Get all buttons and filter for type="submit"
  const submitBtn = screen.getAllByRole("button").find(
    (btn) => btn.getAttribute("type") === "submit"
  );
  if (!submitBtn) {
    throw new Error("Submit button not found. Make sure the form has a button with type='submit'.");
  }
  return submitBtn;
}
const fillAndSubmit = async (email: string, password: string) => {
  fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), { target: { value: email } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: password } });
  fireEvent.click(getSubmitButton());
};

vi.mock("@/lib/api/login", () => ({
  apiLogin: vi.fn() as Mock
}));
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush })
}));
vi.mock("sonner", () => ({ toast: { success: vi.fn() } }));

const mockApiLogin = vi.mocked(apiLogin);
const mockToast = toast.success;

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders email and password fields", () => {
    renderLoginForm();
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(getSubmitButton()).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    renderLoginForm();
    fireEvent.click(getSubmitButton());
    await waitFor(() => {
      expect(screen.getByText('Email required')).toBeInTheDocument();
      expect(screen.getByText('Password required')).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email format", async () => {
    renderLoginForm();
    await fillAndSubmit("invalid-email", "password123");
    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it("shows validation error for missing password only", async () => {
    renderLoginForm();
    await fillAndSubmit("test@example.com", "");
    await waitFor(() => {
      expect(screen.getByText('Password required')).toBeInTheDocument();
    });
  });

  it("shows error on invalid login and does not call toast", async () => {
    mockApiLogin.mockResolvedValueOnce({ 
      success: false,
      error: "Invalid credentials"
    });
    renderLoginForm();
    await fillAndSubmit("test@example.com", "wrongpass");
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      expect(mockToast).not.toHaveBeenCalled();
    });
  });

  it("calls apiLogin and redirects on success", async () => {
    mockApiLogin.mockResolvedValueOnce({ 
      success: true,
      error: undefined
    });
    renderLoginForm();
    await fillAndSubmit("test@example.com", "password123");
    await waitFor(() => {
      expect(mockApiLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(expect.stringMatching(/login successful/i));
    });
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    }, { timeout: 2000 });
  });

  it("shows loading state while submitting and re-enables button after", async () => {
    let resolvePromise!: ((value: { success: boolean; error?: string }) => void);
    const promise = new Promise<{ success: boolean; error?: string }>((resolve) => {
      resolvePromise = resolve;
    });
    mockApiLogin.mockImplementation(() => promise);
    renderLoginForm();
    await fillAndSubmit("test@example.com", "password123");
    expect(screen.getByText(/logging in/i)).toBeInTheDocument();
    expect(getSubmitButton()).toBeDisabled();
    resolvePromise({ success: true, error: undefined });
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
      expect(getSubmitButton()).not.toBeDisabled();
    }, { timeout: 2000 });
  });
});
