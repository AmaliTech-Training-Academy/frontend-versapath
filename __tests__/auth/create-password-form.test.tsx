
import { CreateNewPasswordForm } from '@/app/(auth)/reset-password/component/create-password-form';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { authApi } from '@/lib/api/reset-password';

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

vi.mock('@/lib/api/reset-password', () => ({
  authApi: {
    updatePassword: vi.fn(),
  },
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock('@/components/ui/form', () => ({
  Form: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  FormField: ({ render, control, name }: any) => {
    const field = { value: '', onChange: vi.fn() };
    const fieldState = { error: null };
    return render({ field, fieldState });
  },
}));

vi.mock('./password-input', () => ({
  PasswordInput: ({ label, error, ...props }: any) => (
    <div>
      <label>{label}</label>
      <input type="password" {...props} />
      {error && <span role="alert">{error}</span>}
    </div>
  ),
}));

vi.mock('lucide-react', () => ({
  // Loader: () => <div data-testid="loader">Loading...</div>,
  Eye: () => <div data-testid="eye-icon">Eye</div>,
  EyeOff: () => <div data-testid="eye-off-icon">EyeOff</div>,
}));

// Mock react-hook-form
import * as ReactHookForm from 'react-hook-form';

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(),
}));

const mockUseForm = vi.mocked(ReactHookForm.useForm);

describe('CreateNewPasswordForm', () => {
  const mockPush = vi.fn();
  const mockGet = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
    (useSearchParams as any).mockReturnValue({ get: mockGet });
   
    mockUseForm.mockReturnValue({
      control: {} as any,
      handleSubmit: (fn: Function) => async (e?: any) => {
        if (e && e.preventDefault) e.preventDefault();
        await fn({ password: 'newPassword123', confirmPassword: 'newPassword123' });
      },
      formState: {
        isDirty: false,
        isLoading: false,
        isSubmitted: false,
        isSubmitSuccessful: false,
        isSubmitting: false,
        submitCount: 0,
        touchedFields: {},
        dirtyFields: {},
        errors: {},
        disabled: false,
        defaultValues: {},
      },
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
  });

  it('should render the form with all elements', () => {
    mockGet.mockReturnValue('valid-token');
    
    render(<CreateNewPasswordForm />);

    expect(screen.getByText('Create new password')).toBeInTheDocument();
    expect(screen.getByText('Your new password must be different from previously used ones.')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset Password' })).toBeInTheDocument();
  });

  it('should redirect to login if no reset token is present', () => {
    mockGet.mockReturnValue(null);
    
    render(<CreateNewPasswordForm />);

    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('should not redirect if reset token is present', () => {
    mockGet.mockReturnValue('valid-token');
    
    render(<CreateNewPasswordForm />);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should handle successful password reset', async () => {
    mockGet.mockReturnValue('valid-token');
    (authApi.updatePassword as any).mockResolvedValue({
      success: true,
      data: { message: 'Password reset successful' }
    });

    
    render(<CreateNewPasswordForm />);
    
    const form = screen.getByTestId('create-new-password-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(authApi.updatePassword).toHaveBeenCalledWith('valid-token', {
        password: 'newPassword123',
        confirmPassword: 'newPassword123'
      });
    });

    expect(toast.success).toHaveBeenCalledWith('Password reset successful');
  });

  it('should handle API error response', async () => {
    mockGet.mockReturnValue('valid-token');
    (authApi.updatePassword as any).mockResolvedValue({
      success: false,
      message: 'Invalid token'
    });
    
    render(<CreateNewPasswordForm  />);
    
    const form = screen.getByTestId('create-new-password-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Invalid token')).toBeInTheDocument();
    });

    expect(toast.success).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalledWith('/login');
  });

  it('should handle API network error', async () => {
    mockGet.mockReturnValue('valid-token');
    (authApi.updatePassword as any).mockRejectedValue(new Error('Network error'));
    
    render(<CreateNewPasswordForm />);
    
    const form = screen.getByTestId('create-new-password-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Failed to reset password. Please try again.')).toBeInTheDocument();
    });

    expect(toast.success).not.toHaveBeenCalled();
  });

  it('should clear error message on new submission', async () => {
    mockGet.mockReturnValue('valid-token');
    
    // First, cause an error
    (authApi.updatePassword as any).mockResolvedValue({
      success: false,
      message: 'Invalid token'
    });
    
    render(<CreateNewPasswordForm />);
    
    const form = screen.getByTestId('create-new-password-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Invalid token')).toBeInTheDocument();
    });

    // Then submit again with success
    (authApi.updatePassword as any).mockResolvedValue({
      success: true,
      data: { message: 'Success' }
    });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.queryByText('Invalid token')).not.toBeInTheDocument();
    });
  });


  it('should use default error message when API response has no message', async () => {
    mockGet.mockReturnValue('valid-token');
    (authApi.updatePassword as any).mockResolvedValue({
      success: false
    });
    
    render(<CreateNewPasswordForm />);
    
    const form = screen.getByTestId('create-new-password-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Password reset failed.')).toBeInTheDocument();
    });
  });

  it('should use default success message when API response has no message', async () => {
    mockGet.mockReturnValue('valid-token');
    (authApi.updatePassword as any).mockResolvedValue({
      success: true,
      data: null
    });

    
    render(<CreateNewPasswordForm />);
    
    const form = screen.getByTestId('create-new-password-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Password was reset successfully. Redirecting to login...'
      );
    });
    
  });
});
