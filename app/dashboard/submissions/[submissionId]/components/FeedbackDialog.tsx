import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface FeedbackDialogProps {
  show: boolean;
  editValue: string;
  onChange: (v: string) => void;
  onCancel: () => void;
  onSave: () => void;
  isEdit: boolean;
  line: number | null;
}

export const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
  show,
  editValue,
  onChange,
  onCancel,
  onSave,
  isEdit,
  line,
}) =>
  show ? (
    <div className="fixed inset-0 flex items-center justify-center bg-base-dark-black/30 z-50">
      <div className="relative rounded-lg p-6 w-full max-w-md shadow-lg bg-base-light-background">
        {/* Close (X) button */}
        <button
          className="absolute top-3 right-3 text-gray-text-strong text-lg"
          onClick={onCancel}
          aria-label="Close dialog"
          type="button"
        >
          ×
        </button>
        <h3 className="font-semibold text-lg mb-4 text-center">
          Add Feedback for Line {line}
        </h3>
        <div className="mb-4">
          <label
            htmlFor="feedback-comments"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Feedback Comments
          </label>
          <Textarea
            id="feedback-comments"
            value={editValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full"
            rows={3}
            placeholder="Provide feedback..."
            autoFocus
          />
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="min-w-[100px]"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={!editValue.trim()}
            className="bg-brand-primary-stroke-strong text-base-light-white min-w-[120px]"
          >
            Add Feedback
          </Button>
        </div>
      </div>
    </div>
  ) : null;
