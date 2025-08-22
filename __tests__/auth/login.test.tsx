import { expect } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "@/app/(auth)/login/components/login-form";
import { vi, type Mock } from "vitest";
import { toast } from "sonner";
import { apiLogin } from "@/lib/api/login";

// Create a wrapper component with necessary providers
const renderLoginForm = () => {
  return render(<LoginForm />);
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
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    renderLoginForm();
    const submitButton = screen.getByRole("button", { name: /log in/i });
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      const emailError = screen.getByText('Email required');
      const passwordError = screen.getByText('Password required');
      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });

  it("shows error on invalid login", async () => {
    mockApiLogin.mockResolvedValueOnce({ 
      success: false,
      error: "Invalid credentials"
    });
    renderLoginForm();
    
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole("button", { name: /log in/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpass" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it("calls apiLogin and redirects on success", async () => {
    mockApiLogin.mockResolvedValueOnce({ 
      success: true,
      error: undefined
    });
    renderLoginForm();
    
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole("button", { name: /log in/i });

    await fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    await fireEvent.change(passwordInput, { target: { value: "password123" } });
    await fireEvent.click(submitButton);

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

  it("shows loading state while submitting", async () => {
    let resolvePromise!: ((value: { success: boolean; error?: string }) => void);
    const promise = new Promise<{ success: boolean; error?: string }>((resolve) => {
      resolvePromise = resolve;
    });
    mockApiLogin.mockImplementation(() => promise);
    
    renderLoginForm();
    
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole("button", { name: /log in/i });

    await fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    await fireEvent.change(passwordInput, { target: { value: "password123" } });
    await fireEvent.click(submitButton);

    expect(screen.getByText(/logging in/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    resolvePromise({ success: true, error: undefined });
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    }, { timeout: 2000 });
  });
});
