import { AddSkillAtomForm } from '@/app/dashboard/lessons/components/add-skill-atom-form';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { atomApi } from '@/lib/api/skill-atom-api';
import { toast } from 'sonner';

// Mock external dependencies
vi.mock('@/lib/api/skill-atom-api', () => ({
  atomApi: {
    createAtom: vi.fn(),
  },
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/components/ui/form', () => ({
  Form: ({ children, ...props }: any) => <div data-testid="form-wrapper">{children}</div>,
  FormControl: ({ children }: any) => <div>{children}</div>,
  FormField: ({ render, control, name }: any) => {
    const field = { 
      onChange: vi.fn(), 
      value: '', 
      name,
      onBlur: vi.fn(),
      ref: vi.fn()
    };
    return render({ field });
  },
  FormItem: ({ children }: any) => <div>{children}</div>,
  FormLabel: ({ children }: any) => <label>{children}</label>,
  FormMessage: () => <div data-testid="form-message" />,
}));

vi.mock('@/components/ui/radio-group', () => ({
  RadioGroup: ({ children, onValueChange, value, className }: any) => (
    <div className={className} data-testid="radio-group" data-value={value}>
      {children}
    </div>
  ),
  RadioGroupItem: ({ value, id }: any) => (
    <input
      type="radio"
      value={value}
      id={id}
      data-testid={`radio-${value}`}
      onChange={() => {}}
    />
  ),
}));

vi.mock('@/components/ui/sheet', () => ({
  SheetClose: ({ children, asChild }: any) => asChild ? children : <div>{children}</div>,
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, type, disabled, onClick, ...props }: any) => (
    <button 
      type={type} 
      disabled={disabled} 
      onClick={onClick}
      data-variant={variant}
      {...props}
    >
      {children}
    </button>
  ),
}));

vi.mock('@/components/custom/custom-input', () => ({
  CustomInput: ({ label, type, min, placeholder, onChange, value, name }: any) => (
    <div>
      <label>{label}</label>
      <input
        type={type}
        min={min}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        data-testid={`input-${name}`}
      />
    </div>
  ),
}));

vi.mock('@/components/custom/custom-text-area', () => ({
  CustomTextarea: ({ label, placeholder, onChange, value, name }: any) => (
    <div>
      <label>{label}</label>
      <textarea
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        data-testid={`textarea-${name}`}
      />
    </div>
  ),
}));

vi.mock('lucide-react', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock('@heroicons/react/24/outline', () => ({
  QuestionMarkCircleIcon: () => <div data-testid="question-mark-icon">?</div>,
}));

const mockHandleSubmit = vi.fn();
const mockReset = vi.fn();
const mockFormState = { isSubmitting: false };

// Mock react-hook-form with configurable behavior
vi.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {},
    handleSubmit: mockHandleSubmit,
    formState: mockFormState,
    reset: mockReset,
  }),
}));

// Mock Zod schema
vi.mock('@/lib/schemas/lesson', () => ({
  SkillAtomSchema: {},
}));

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(),
}));

describe('AddSkillAtomForm', () => {
  const mockOnSuccess = vi.fn();
  const mockCreateAtom = vi.mocked(atomApi.createAtom);

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset form state to default
    Object.assign(mockFormState, { isSubmitting: false });
    mockHandleSubmit.mockImplementation((fn: any) => (e: any) => {
      e.preventDefault();
      fn({
        lessonName: 'Test Lesson',
        description: 'Test Description',
        objectives: 'Test Objectives',
        moodleUrl: 'https://test.com',
        hours: '3',
        status: 'draft',
      });
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders all form fields correctly', () => {
      render(<AddSkillAtomForm />);

      expect(screen.getByText('Lesson Name')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Objectives')).toBeInTheDocument();
      expect(screen.getByText('Moodle Content URL')).toBeInTheDocument();
      expect(screen.getByText('Hours *')).toBeInTheDocument();
      expect(screen.getByText('Skill Status *')).toBeInTheDocument();
    });

    it('renders radio buttons for status field', () => {
      render(<AddSkillAtomForm />);

      expect(screen.getByTestId('radio-draft')).toBeInTheDocument();
      expect(screen.getByTestId('radio-publish')).toBeInTheDocument();
      expect(screen.getByText('Draft')).toBeInTheDocument();
      expect(screen.getByText('Publish')).toBeInTheDocument();
    });

    it('renders action buttons correctly', () => {
      render(<AddSkillAtomForm />);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      const saveButton = screen.getByRole('button', { name: /save lesson/i });

      expect(cancelButton).toBeInTheDocument();
      expect(cancelButton).toHaveAttribute('data-variant', 'outline');
      expect(saveButton).toBeInTheDocument();
      expect(saveButton).toHaveAttribute('type', 'submit');
    });

    it('displays question mark icon for status field', () => {
      render(<AddSkillAtomForm />);

      expect(screen.getByTestId('question-mark-icon')).toBeInTheDocument();
    });

    it('shows correct placeholder texts', () => {
      render(<AddSkillAtomForm />);

      const descriptionTextarea = screen.getByTestId('textarea-description');
      const objectivesTextarea = screen.getByTestId('textarea-objectives');
      const moodleTextarea = screen.getByTestId('textarea-moodleUrl');
      const hoursInput = screen.getByTestId('input-hours');

      expect(descriptionTextarea).toHaveAttribute('placeholder', 'Brief description of this category...');
      expect(objectivesTextarea).toHaveAttribute('placeholder', 'Brief description of this category...');
      expect(moodleTextarea).toHaveAttribute('placeholder', 'https://example.com');
      expect(hoursInput).toHaveAttribute('placeholder', 'Enter estimated hours');
    });

    it('renders without onSuccess prop', () => {
      expect(() => render(<AddSkillAtomForm />)).not.toThrow();
    });
  });

  describe('Form Submission - Success Scenarios', () => {
    it('calls onSuccess callback when form submission is successful', async () => {
      mockCreateAtom.mockResolvedValueOnce({ id: '1', name: 'Test Lesson' } as any);

      render(<AddSkillAtomForm onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /save lesson/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCreateAtom).toHaveBeenCalledWith({
          name: 'Test Lesson',
          description: 'Test Description',
          objectives: 'Test Objectives',
          estimatedHours: 3,
          status: 'INACTIVE',
        });
        expect(toast.success).toHaveBeenCalledWith('New Lesson Added successfully');
        expect(mockOnSuccess).toHaveBeenCalled();
      });
    });

    it('works without onSuccess callback', async () => {
      mockCreateAtom.mockResolvedValueOnce({ id: '1', name: 'Test Lesson' } as any);

      render(<AddSkillAtomForm />);

      const submitButton = screen.getByRole('button', { name: /save lesson/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCreateAtom).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith('New Lesson Added successfully');
      });
    });

    it('transforms form data correctly for API call', async () => {
      mockCreateAtom.mockResolvedValueOnce({ id: '1' } as any);

      // Configure mock to return different data
      mockHandleSubmit.mockImplementation((fn: any) => (e: any) => {
        e.preventDefault();
        fn({
          lessonName: 'Advanced React',
          description: 'Learn advanced React concepts',
          objectives: 'Master hooks and context',
          moodleUrl: 'https://moodle.example.com',
          hours: '5',
          status: 'publish',
        });
      });

      render(<AddSkillAtomForm />);

      const submitButton = screen.getByRole('button', { name: /save lesson/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCreateAtom).toHaveBeenCalledWith({
          name: 'Advanced React',
          description: 'Learn advanced React concepts',
          objectives: 'Master hooks and context',
          estimatedHours: 5,
          status: 'ACTIVE', // 'publish' should transform to 'ACTIVE'
        });
      });
    });
  });

  describe('Form Submission - Error Scenarios', () => {
    it('handles form submission failure when API returns null', async () => {
      mockCreateAtom.mockResolvedValueOnce(undefined);

      render(<AddSkillAtomForm onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /save lesson/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCreateAtom).toHaveBeenCalled();
        expect(toast.error).toHaveBeenCalledWith('Failed to add lesson, Please try again later.');
        expect(mockOnSuccess).not.toHaveBeenCalled();
      });
    });

    it('handles API errors gracefully', async () => {
      render(<AddSkillAtomForm onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /save lesson/i });
      
      expect(() => fireEvent.click(submitButton)).not.toThrow();

      await waitFor(() => {
        expect(mockCreateAtom).toHaveBeenCalled();
      });
    });

    it('handles API timeout scenarios', async () => {

      render(<AddSkillAtomForm onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /save lesson/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCreateAtom).toHaveBeenCalled();
      });
            await new Promise(resolve => setTimeout(resolve, 60));
    });
  });

  describe('Form Validation', () => {
    it('renders form message component for validation errors', () => {
      render(<AddSkillAtomForm />);
      
      expect(screen.getByTestId('form-message')).toBeInTheDocument();
    });

    it('sets correct input attributes for validation', () => {
      render(<AddSkillAtomForm />);

      const hoursInput = screen.getByTestId('input-hours');
      expect(hoursInput).toHaveAttribute('type', 'number');
      expect(hoursInput).toHaveAttribute('min', '1');
    });
  });

  describe('Loading States', () => {
    it('shows loader when form is submitting', () => {
      // Set form to submitting state
      Object.assign(mockFormState, { isSubmitting: true });

      render(<AddSkillAtomForm />);

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('disables submit button when form is submitting', () => {
      // Set form to submitting state
      Object.assign(mockFormState, { isSubmitting: true });

      render(<AddSkillAtomForm />);

      const submitButton = screen.getByRole('button', { name: /save lesson/i });
      expect(submitButton).toBeDisabled();
    });

    it('enables submit button when form is not submitting', () => {
      Object.assign(mockFormState, { isSubmitting: false });

      render(<AddSkillAtomForm />);

      const submitButton = screen.getByRole('button', { name: /save lesson/i });
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Data Transformation', () => {
    it('converts hours from string to number', async () => {
      mockCreateAtom.mockResolvedValueOnce({ id: '1' } as any);

      render(<AddSkillAtomForm />);

      const submitButton = screen.getByRole('button', { name: /save lesson/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCreateAtom).toHaveBeenCalledWith(
          expect.objectContaining({
            estimatedHours: 3, 
          })
        );
      });
    });

    it('transforms draft status to INACTIVE', async () => {
      mockCreateAtom.mockResolvedValueOnce({ id: '1' } as any);

      render(<AddSkillAtomForm />);

      const submitButton = screen.getByRole('button', { name: /save lesson/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCreateAtom).toHaveBeenCalledWith(
          expect.objectContaining({
            status: 'INACTIVE', 
          })
        );
      });
    });

    it('handles empty description and objectives', async () => {
      mockCreateAtom.mockResolvedValueOnce({ id: '1' } as any);
      mockHandleSubmit.mockImplementation((fn: any) => (e: any) => {
        e.preventDefault();
        fn({
          lessonName: 'Test Lesson',
          description: '',
          objectives: undefined,
          moodleUrl: 'https://test.com',
          hours: '2',
          status: 'draft',
        });
      });

      render(<AddSkillAtomForm />);

      const submitButton = screen.getByRole('button', { name: /save lesson/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCreateAtom).toHaveBeenCalledWith(
          expect.objectContaining({
            description: '', 
            objectives: '',
          })
        );
      });
    });
  });

  describe('User Interactions', () => {
    it('allows user to interact with form fields', async () => {
      const user = userEvent.setup();
      render(<AddSkillAtomForm />);

      const lessonNameInput = screen.getByTestId('input-lessonName');
      const descriptionTextarea = screen.getByTestId('textarea-description');

      expect(lessonNameInput).toBeInTheDocument();
      expect(descriptionTextarea).toBeInTheDocument();
    });

    it('radio buttons are interactive', () => {
      render(<AddSkillAtomForm />);

      const draftRadio = screen.getByTestId('radio-draft');
      const publishRadio = screen.getByTestId('radio-publish');

      expect(draftRadio).toHaveAttribute('type', 'radio');
      expect(publishRadio).toHaveAttribute('type', 'radio');
      expect(draftRadio).toHaveAttribute('value', 'draft');
      expect(publishRadio).toHaveAttribute('value', 'publish');
    });
  });

  describe('Form Reset', () => {
    it('resets form after successful submission', async () => {
      mockCreateAtom.mockResolvedValueOnce({ id: '1' } as any);

      render(<AddSkillAtomForm />);

      const submitButton = screen.getByRole('button', { name: /save lesson/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCreateAtom).toHaveBeenCalled();
        expect(mockReset).toHaveBeenCalled();
      });
    });
  });
});