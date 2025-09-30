"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { CodeWithFeedback } from "./CodeWithFeedback";
import { FeedbackDialog } from "./FeedbackDialog";
import { FeedbackSummary } from "./FeedbackSummary";

interface CodeViewerProps {
  readonly code: string;
  readonly language: string;
  readonly githubUrl?: string;
}

export default function CodeViewer({ code, githubUrl }: CodeViewerProps) {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [inlineFeedback, setInlineFeedback] = useState<Record<number, string>>(
    {}
  );
  const [editingLine, setEditingLine] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const lines = code.split("\n");

  const handleAddFeedback = (line: number) => {
    setEditingLine(line);
    setEditValue(inlineFeedback[line] || "");
    setShowDialog(true);
  };

  const handleSaveFeedback = () => {
    if (editingLine !== null) {
      setInlineFeedback({ ...inlineFeedback, [editingLine]: editValue });
      setShowDialog(false);
      setEditingLine(null);
      setEditValue("");
    }
  };

  const handleRemoveFeedback = (line: number) => {
    const updated = { ...inlineFeedback };
    delete updated[line];
    setInlineFeedback(updated);
  };

  const handleEditFeedback = (line: number) => {
    setEditingLine(line);
    setEditValue(inlineFeedback[line] || "");
    setShowDialog(true);
  };

  return (
    <div className="bg-[#FFFFFF] p-3 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="font-semibold text-gray-text-strong">Code Review</h3>
          <p className="text-sm text-gray-text-weak">
            Click on line numbers to add inline feedback
          </p>
        </div>
        {githubUrl && (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="bg-base-light-background"
          >
            <a href={githubUrl} target="_blank" rel="noreferrer">
              <GithubIcon className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </Button>
        )}
      </div>

      <div className="bg-base-dark-background text-green-stroke-strong rounded-2xl overflow-x-auto">
        <div className="flex">
          <CodeWithFeedback
            lines={lines}
            selectedLine={selectedLine}
            setSelectedLine={setSelectedLine}
            inlineFeedback={inlineFeedback}
            onAddFeedback={handleAddFeedback}
            onEditFeedback={handleEditFeedback}
            onRemoveFeedback={handleRemoveFeedback}
          />
        </div>
      </div>

      <FeedbackDialog
        show={showDialog}
        editValue={editValue}
        onChange={setEditValue}
        onCancel={() => {
          setShowDialog(false);
          setEditingLine(null);
          setEditValue("");
        }}
        onSave={handleSaveFeedback}
        isEdit={!!inlineFeedback[editingLine!]}
        line={editingLine}
      />

      <FeedbackSummary inlineFeedback={inlineFeedback} />
    </div>
  );
}
