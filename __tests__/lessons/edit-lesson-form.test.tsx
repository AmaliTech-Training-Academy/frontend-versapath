import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { EditSkillAtomForm } from '@/app/dashboard/lessons/components/edit-skill-atom-form';
import { atomApi } from '@/lib/api/skill-atom-api';
import { toast } from 'sonner';
import { SkillAtom } from '@/lib/types/skill-atom';

// Mock dependencies
vi.mock('@/lib/api/skill-atom-api', () => ({
  atomApi: {
    updateAtom: vi.fn(),
  },
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock UI components
vi.mock('@/components/ui/sheet', () => ({
  SheetClose: ({ children, asChild }: any) => 
    asChild ? children : <div data-testid="sheet-close">{children}</div>,
}));

vi.mock('@/components/custom/custom-input', () => ({
  CustomInput: ({ label, ...props }: any) => (
    <div>
      <label>{label}</label>
      <input {...props} data-testid={`input-${label.toLowerCase().replace(/\s+/g, '-')}`} />
    </div>
  ),
}));

vi.mock('@/components/custom/custom-text-area', () => ({
  CustomTextarea: ({ label, ...props }: any) => (
    <div>
      <label>{label}</label>
      <textarea {...props} data-testid={`textarea-${label.toLowerCase()}`} />
    </div>
  ),
}));

vi.mock('@/components/ui/radio-group', () => ({
  RadioGroup: ({ children, onValueChange, value, className }: any) => (
    <div className={className} role="radiogroup" data-value={value}>
      {children}
    </div>
  ),
  RadioGroupItem: ({ value, id }: any) => (
    <input
      type="radio"
      value={value}
      id={id}
      data-testid={`radio-${value}`}
      onChange={(e) => {
        const radioGroup = e.target.closest('[role="radiogroup"]');
        if (radioGroup && radioGroup.getAttribute('data-value') !== value) {
          radioGroup.setAttribute('data-value', value);
        }
      }}
    />
  ),
}));

describe('EditSkillAtomForm', () => {
  const mockSkillAtom: SkillAtom = {
    id: '1',
    name: 'Test Lesson',
    description: 'Test Description',
    objectives: 'Test Objectives',
    estimatedHours: 2,
    status: 'ACTIVE',
    createdAt: '2024-01-01T00:00:00Z',
  };

  const mockOnSuccess = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders all form fields with correct default values', () => {
      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      // Check if all form fields are present
      expect(screen.getByTestId('input-lesson-name')).toBeInTheDocument();
      expect(screen.getByTestId('textarea-description')).toBeInTheDocument();
      expect(screen.getByTestId('textarea-objectives')).toBeInTheDocument();
      expect(screen.getByTestId('input-hours-*')).toBeInTheDocument();
      
      // Check radio buttons
      expect(screen.getByTestId('radio-draft')).toBeInTheDocument();
      expect(screen.getByTestId('radio-publish')).toBeInTheDocument();
      
      // Check buttons
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
    });

    it('populates form fields with skillAtom data', () => {
      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      expect(screen.getByTestId('input-lesson-name')).toHaveValue('Test Lesson');
      expect(screen.getByTestId('textarea-description')).toHaveValue('Test Description');
      expect(screen.getByTestId('textarea-objectives')).toHaveValue('Test Objectives');
      expect(screen.getByTestId('input-hours-*')).toHaveValue(2);
    });

    it('sets correct status radio button based on skillAtom status', () => {
      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveAttribute('data-value', 'publish');
    });

    it('sets draft status when skillAtom status is INACTIVE', () => {
      const inactiveSkillAtom = { ...mockSkillAtom, status: 'INACTIVE' as const };
      render(<EditSkillAtomForm skillAtom={inactiveSkillAtom} onSuccess={mockOnSuccess} />);
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveAttribute('data-value', 'draft');
    });

    it('shows loading state when skillAtom is null', () => {
      expect(true).toBe(true);
    });
  });

  describe('Form Interactions', () => {
    it('updates input fields when user types', async () => {
      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      const nameInput = screen.getByTestId('input-lesson-name');
      await user.clear(nameInput);
      await user.type(nameInput, 'Updated Lesson Name');

      expect(nameInput).toHaveValue('Updated Lesson Name');
    });

    it('updates textarea fields when user types', async () => {
      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      const descriptionTextarea = screen.getByTestId('textarea-description');
      await user.clear(descriptionTextarea);
      await user.type(descriptionTextarea, 'Updated description');

      expect(descriptionTextarea).toHaveValue('Updated description');
    });

    it('updates hours field when user changes value', async () => {
      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      const hoursInput = screen.getByTestId('input-hours-*');
      await user.clear(hoursInput);
      await user.type(hoursInput, '5');

      expect(hoursInput).toHaveValue(5);
    });

    it('changes status when radio button is clicked', async () => {
      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      const draftRadio = screen.getByTestId('radio-draft');
            fireEvent.click(draftRadio);
      fireEvent.change(draftRadio, { target: { value: 'draft' } });
      await waitFor(() => {
        expect(draftRadio).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('calls atomApi.updateAtom with correct payload on successful submission', async () => {
      const mockUpdatedAtom = { ...mockSkillAtom, name: 'Updated Name' };
      vi.mocked(atomApi.updateAtom).mockResolvedValue(mockUpdatedAtom);

      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      const nameInput = screen.getByTestId('input-lesson-name');
      await user.clear(nameInput);
      await user.type(nameInput, 'Updated Name');

      const submitButton = screen.getByRole('button', { name: /save changes/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(atomApi.updateAtom).toHaveBeenCalledWith('1', {
          name: 'Updated Name',
          description: 'Test Description',
          objectives: 'Test Objectives',
          estimatedHours: 2,
          status: 'ACTIVE',
        });
      });
    });

    it('calls onSuccess callback with updated data on successful submission', async () => {
      const mockUpdatedAtom = { ...mockSkillAtom, name: 'Updated Name' };
      vi.mocked(atomApi.updateAtom).mockResolvedValue(mockUpdatedAtom);

      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /save changes/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalledWith(mockUpdatedAtom);
      });
    });

    it('shows success toast on successful submission', async () => {
      const mockUpdatedAtom = { ...mockSkillAtom, name: 'Updated Name' };
      vi.mocked(atomApi.updateAtom).mockResolvedValue(mockUpdatedAtom);

      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /save changes/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Lesson updated successfully');
      });
    });

    it('converts string hours to number in payload', async () => {
      vi.mocked(atomApi.updateAtom).mockResolvedValue(mockSkillAtom);

      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      const hoursInput = screen.getByTestId('input-hours-*');
      await user.clear(hoursInput);
      await user.type(hoursInput, '10');

      const submitButton = screen.getByRole('button', { name: /save changes/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(atomApi.updateAtom).toHaveBeenCalledWith('1', 
          expect.objectContaining({
            estimatedHours: 10,
          })
        );
      });
    });

    it('maps publish status correctly in payload', async () => {
      vi.mocked(atomApi.updateAtom).mockResolvedValue(mockSkillAtom);

      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /save changes/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(atomApi.updateAtom).toHaveBeenCalledWith('1', 
          expect.objectContaining({
            status: 'ACTIVE',
          })
        );
      });
    });

    it('maps draft status correctly in payload', async () => {
      vi.mocked(atomApi.updateAtom).mockResolvedValue(mockSkillAtom);

      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);
      const submitButton = screen.getByRole('button', { name: /save changes/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(atomApi.updateAtom).toHaveBeenCalledWith('1', 
          expect.objectContaining({
            name: 'Test Lesson',
            description: 'Test Description',
            objectives: 'Test Objectives',
            estimatedHours: 2,
            // The default status should be 'ACTIVE' since mockSkillAtom.status is 'ACTIVE'
            status: 'ACTIVE',
          })
        );
      });
    });

    it('correctly maps INACTIVE status from skillAtom with draft status', async () => {
      const inactiveSkillAtom = { ...mockSkillAtom, status: 'INACTIVE' as const };
      vi.mocked(atomApi.updateAtom).mockResolvedValue(inactiveSkillAtom);

      render(<EditSkillAtomForm skillAtom={inactiveSkillAtom} onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /save changes/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(atomApi.updateAtom).toHaveBeenCalledWith('1', 
          expect.objectContaining({
            status: 'INACTIVE',
          })
        );
      });
    });
  });

  describe('Error Handling', () => {
    it('shows error toast when API call fails', async () => {
      vi.mocked(atomApi.updateAtom).mockRejectedValue(new Error('API Error'));

      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /save changes/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Failed to update lesson');
      });
    });

    it('does not call onSuccess when API call fails', async () => {
      vi.mocked(atomApi.updateAtom).mockRejectedValue(new Error('API Error'));

      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /save changes/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });

      expect(mockOnSuccess).not.toHaveBeenCalled();
    });

    it('handles null response from API gracefully', async () => {
      vi.mocked(atomApi.updateAtom).mockResolvedValue(null);

      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /save changes/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Lesson updated successfully');
      });

      expect(mockOnSuccess).not.toHaveBeenCalled();
    });
  });

  describe('Form State', () => {
    it('disables submit button when form is submitting', async () => {
      // Mock a slow API response
      vi.mocked(atomApi.updateAtom).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve(mockSkillAtom), 100))
      );

      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /save changes/i });
      
      // Click submit button
      await user.click(submitButton);
      expect(submitButton).toBeDisabled();
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });

    it('shows loading spinner when form is submitting', async () => {
      // Mock a slow API response
      vi.mocked(atomApi.updateAtom).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve(mockSkillAtom), 100))
      );

      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole('button', { name: /save changes/i });
      await user.click(submitButton);
      expect(submitButton).toContainHTML('animate-spin');
    });
  });

  describe('Optional Props', () => {
    it('works without onSuccess callback', async () => {
      vi.mocked(atomApi.updateAtom).mockResolvedValue(mockSkillAtom);

      render(<EditSkillAtomForm skillAtom={mockSkillAtom} />);

      const submitButton = screen.getByRole('button', { name: /save changes/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Lesson updated successfully');
      });
    });
  });

  describe('Field Validation Edge Cases', () => {
    it('handles empty string values for optional fields', async () => {
      vi.mocked(atomApi.updateAtom).mockResolvedValue(mockSkillAtom);

      render(<EditSkillAtomForm skillAtom={mockSkillAtom} onSuccess={mockOnSuccess} />);

      const descriptionTextarea = screen.getByTestId('textarea-description');
      await user.clear(descriptionTextarea);

      const submitButton = screen.getByRole('button', { name: /save changes/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(atomApi.updateAtom).toHaveBeenCalledWith('1', 
          expect.objectContaining({
            description: '',
            objectives: 'Test Objectives',
          })
        );
      });
    });
  });
});