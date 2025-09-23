
import { SkillAtomCard } from '@/app/dashboard/lessons/components/skill-atom-card';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SkillAtom } from '@/lib/types/skill-atom';

// Mock dependencies
vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: any) => (
    <div className={className} data-testid="skill-atom-card">
      {children}
    </div>
  ),
  CardContent: ({ children, className }: any) => (
    <div className={className} data-testid="card-content">
      {children}
    </div>
  ),
}));

vi.mock('lucide-react', () => ({
  FileText: ({ className }: any) => (
    <div className={className} data-testid="file-text-icon">
      FileText Icon
    </div>
  ),
  MoreVertical: ({ className }: any) => (
    <div className={className} data-testid="more-vertical-icon">
      MoreVertical Icon
    </div>
  ),
  // Add other commonly used icons from lucide-react if needed
  Edit: ({ className }: any) => (
    <div className={className} data-testid="edit-icon">
      Edit Icon
    </div>
  ),
  Eye: ({ className }: any) => (
    <div className={className} data-testid="eye-icon">
      Eye Icon
    </div>
  ),
  Trash: ({ className }: any) => (
    <div className={className} data-testid="trash-icon">
      Trash Icon
    </div>
  ),
}));

vi.mock('./skill-atom-card-menu', () => ({
  LessonCardMenu: ({ onView, onEdit, onDelete, atomData }: any) => (
    <div data-testid="lesson-card-menu">
      <button onClick={onView} data-testid="menu-view-btn">
        View
      </button>
      <button onClick={onEdit} data-testid="menu-edit-btn">
        Edit
      </button>
      <button onClick={onDelete} data-testid="menu-delete-btn">
        Delete
      </button>
      <span data-testid="menu-atom-id">{atomData.id}</span>
    </div>
  ),
}));

describe('SkillAtomCard', () => {
  const mockSkillAtom: SkillAtom = {
    id: 'skill-atom-1',
    name: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript programming language including variables, functions, and control structures.',
    objectives: 'Understand variables, functions, and basic programming concepts',
    estimatedHours: 8,
    status: 'ACTIVE',
    createdAt: '2024-01-01T00:00:00Z',
  };

  const mockCallbacks = {
    onView: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    onRefresh: vi.fn(),
  };

  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders the skill atom card with correct structure', () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} {...mockCallbacks} />);

      expect(screen.getByTestId('skill-atom-card')).toBeInTheDocument();
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
      expect(screen.getByTestId('file-text-icon')).toBeInTheDocument();
      expect(screen.getByTestId('lesson-card-menu')).toBeInTheDocument();
    });

    it('displays skill atom name correctly', () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} {...mockCallbacks} />);

      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('JavaScript Fundamentals');
    });

    it('displays skill atom description correctly', () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} {...mockCallbacks} />);

      expect(screen.getByText('Learn the basics of JavaScript programming language including variables, functions, and control structures.')).toBeInTheDocument();
    });

    it('applies correct CSS classes to the card', () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} {...mockCallbacks} />);

      const card = screen.getByTestId('skill-atom-card');
      expect(card).toHaveClass('cursor-pointer', 'px-3', 'py-1', 'bg-gray-stroke-weak/20', 'hover:bg-brand-primary-text/7', 'hover:border-brand-primary-text/20', 'border-gray-stroke-strong/80');
    });

    it('applies correct CSS classes to the card content', () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} {...mockCallbacks} />);

      const cardContent = screen.getByTestId('card-content');
      expect(cardContent).toHaveClass('p-1');
    });

    it('renders FileText icon with correct classes', () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} {...mockCallbacks} />);

      const icon = screen.getByTestId('file-text-icon');
      expect(icon).toHaveClass('h-5', 'w-5');
    });
  });

  describe('Content Display', () => {
    it('handles long skill atom names gracefully', () => {
      const longNameSkillAtom = {
        ...mockSkillAtom,
        name: 'Very Long Skill Atom Name That Should Be Displayed Properly Without Breaking The Layout',
      };

      render(<SkillAtomCard skillatom={longNameSkillAtom} {...mockCallbacks} />);

      expect(screen.getByText('Very Long Skill Atom Name That Should Be Displayed Properly Without Breaking The Layout')).toBeInTheDocument();
    });

    it('handles long descriptions gracefully', () => {
      const longDescriptionSkillAtom = {
        ...mockSkillAtom,
        description: 'This is a very long description that should be displayed properly without breaking the layout. It contains multiple sentences and should wrap correctly within the card component while maintaining readability and proper styling.',
      };

      render(<SkillAtomCard skillatom={longDescriptionSkillAtom} {...mockCallbacks} />);

      expect(screen.getByText(/This is a very long description/)).toBeInTheDocument();
    });

    it('handles empty description', () => {
      const emptyDescriptionSkillAtom = {
        ...mockSkillAtom,
        description: '',
      };

      render(<SkillAtomCard skillatom={emptyDescriptionSkillAtom} {...mockCallbacks} />);

      // The paragraph should still exist but be empty
      const description = screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'p' && content === '';
      });
      expect(description).toBeInTheDocument();
    });

    it('handles skill atom with minimal data', () => {
      const minimalSkillAtom: SkillAtom = {
        id: 'minimal-1',
        name: 'Test',
        description: 'Test desc',
        objectives: '',
        estimatedHours: 1,
        status: 'ACTIVE',
        createdAt: '2024-01-01T00:00:00Z',
      };

      render(<SkillAtomCard skillatom={minimalSkillAtom} {...mockCallbacks} />);

      expect(screen.getByText('Test')).toBeInTheDocument();
      expect(screen.getByText('Test desc')).toBeInTheDocument();
    });
  });

  describe('Menu Integration', () => {
    it('passes correct props to LessonCardMenu', () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} {...mockCallbacks} />);

      // Verify the menu receives the correct atomData
      expect(screen.getByTestId('menu-atom-id')).toHaveTextContent('skill-atom-1');
    });

    it('calls onView callback when menu view button is clicked', async () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} {...mockCallbacks} />);

      const viewButton = screen.getByTestId('menu-view-btn');
      await user.click(viewButton);

      expect(mockCallbacks.onView).toHaveBeenCalledTimes(1);
      expect(mockCallbacks.onView).toHaveBeenCalledWith('skill-atom-1');
    });

    it('calls onDelete callback when menu delete button is clicked', async () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} {...mockCallbacks} />);

      const deleteButton = screen.getByTestId('menu-delete-btn');
      await user.click(deleteButton);

      expect(mockCallbacks.onDelete).toHaveBeenCalledTimes(1);
      expect(mockCallbacks.onDelete).toHaveBeenCalledWith('skill-atom-1');
    });

    it('calls onRefresh callback when menu edit button is clicked', async () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} {...mockCallbacks} />);

      const editButton = screen.getByTestId('menu-edit-btn');
      await user.click(editButton);

      expect(mockCallbacks.onRefresh).toHaveBeenCalledTimes(1);
    });
  });

  describe('Optional Callback Props', () => {
    it('works without onView callback', () => {
      const { onView, ...otherCallbacks } = mockCallbacks;
      
      render(<SkillAtomCard skillatom={mockSkillAtom} {...otherCallbacks} />);

      expect(screen.getByTestId('skill-atom-card')).toBeInTheDocument();
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    it('works without onDelete callback', () => {
      const { onDelete, ...otherCallbacks } = mockCallbacks;
      
      render(<SkillAtomCard skillatom={mockSkillAtom} {...otherCallbacks} />);

      expect(screen.getByTestId('skill-atom-card')).toBeInTheDocument();
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    it('works without onRefresh callback', () => {
      const { onRefresh, ...otherCallbacks } = mockCallbacks;
      
      render(<SkillAtomCard skillatom={mockSkillAtom} {...otherCallbacks} />);

      expect(screen.getByTestId('skill-atom-card')).toBeInTheDocument();
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    it('works with no callback props at all', () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} />);

      expect(screen.getByTestId('skill-atom-card')).toBeInTheDocument();
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
      expect(screen.getByTestId('lesson-card-menu')).toBeInTheDocument();
    });
  });

  describe('Different Skill Atom States', () => {
    it('renders INACTIVE skill atom correctly', () => {
      const inactiveSkillAtom = {
        ...mockSkillAtom,
        status: 'INACTIVE' as const,
      };

      render(<SkillAtomCard skillatom={inactiveSkillAtom} {...mockCallbacks} />);

      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
      // The component should render the same regardless of status
    });

    it('renders skill atom with different estimated hours', () => {
      const skillAtomWithDifferentHours = {
        ...mockSkillAtom,
        estimatedHours: 20,
      };

      render(<SkillAtomCard skillatom={skillAtomWithDifferentHours} {...mockCallbacks} />);

      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} {...mockCallbacks} />);

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('JavaScript Fundamentals');
    });

    it('maintains proper text hierarchy', () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} {...mockCallbacks} />);

      const heading = screen.getByRole('heading', { level: 3 });
      const description = screen.getByText(/Learn the basics of JavaScript/);

      expect(heading).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      
      // Verify heading comes before description in DOM order
      const elements = screen.getByTestId('skill-atom-card').querySelectorAll('h3, p');
      expect(elements[0]).toBe(heading);
      expect(elements[1]).toBe(description);
    });
  });

  describe('Layout Structure', () => {
    it('maintains proper flex layout structure', () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} {...mockCallbacks} />);

      const cardContent = screen.getByTestId('card-content');
      const flexContainer = cardContent.querySelector('.flex.items-start.justify-between');
      
      expect(flexContainer).toBeInTheDocument();
    });

    it('has icon positioned correctly', () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} {...mockCallbacks} />);

      const icon = screen.getByTestId('file-text-icon');
      const iconContainer = icon.parentElement;
      
      expect(iconContainer).toHaveClass('flex-shrink-0', 'mt-1');
    });

    it('has content area with proper flex classes', () => {
      render(<SkillAtomCard skillatom={mockSkillAtom} {...mockCallbacks} />);

      const heading = screen.getByRole('heading', { level: 3 });
      const contentContainer = heading.parentElement;
      
      expect(contentContainer).toHaveClass('flex-1', 'min-w-0');
    });
  });

  describe('Error Handling', () => {
    it('handles skill atom with null/undefined name gracefully', () => {
      const skillAtomWithoutName = {
        ...mockSkillAtom,
        name: undefined as any,
      };

      render(<SkillAtomCard skillatom={skillAtomWithoutName} {...mockCallbacks} />);

      // Component should still render without crashing
      expect(screen.getByTestId('skill-atom-card')).toBeInTheDocument();
    });

    it('handles skill atom with null/undefined description gracefully', () => {
      const skillAtomWithoutDescription = {
        ...mockSkillAtom,
        description: undefined as any,
      };

      render(<SkillAtomCard skillatom={skillAtomWithoutDescription} {...mockCallbacks} />);

      expect(screen.getByTestId('skill-atom-card')).toBeInTheDocument();
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });
  });
});