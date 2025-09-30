import React from "react";
import { Button } from "@/components/ui/button";

interface CodeWithFeedbackProps {
  lines: string[];
  selectedLine: number | null;
  setSelectedLine: (line: number | null) => void;
  inlineFeedback: Record<number, string>;
  onAddFeedback: (line: number) => void;
  onEditFeedback: (line: number) => void;
  onRemoveFeedback: (line: number) => void;
}

export const CodeWithFeedback: React.FC<CodeWithFeedbackProps> = ({
  lines,
  selectedLine,
  setSelectedLine,
  inlineFeedback,
  onAddFeedback,
  onEditFeedback,
  onRemoveFeedback,
}) => (
  <div className="flex-1 p-4 overflow-x-auto">
    <pre className="text-sm leading-6">
      <code>
        {lines.map((line, index) => {
          const isSelected = selectedLine === index + 1;
          return (
            <div key={`code-row-${index + 1}`} className="flex flex-col">
              <button
                type="button"
                className={
                  `whitespace-pre flex items-start group relative w-full text-left ` +
                  (isSelected ? " bg-[#006FFF1A]" : "")
                }
                onClick={() => setSelectedLine(isSelected ? null : index + 1)}
                aria-label={`Select line ${index + 1}`}
                tabIndex={0}
                style={{ cursor: "pointer" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedLine(isSelected ? null : index + 1);
                  }
                }}
              >
                <span className="font-mono text-xs text-gray-400 mr-2">
                  {index + 1}
                </span>
                <span className="flex-1">{line || " "}</span>
                {isSelected && !inlineFeedback[index + 1] && (
                  <Button
                    className="ml-4 text-xs bg-base-light-background text-white px-2 py-1 rounded hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddFeedback(index + 1);
                    }}
                    tabIndex={0}
                    aria-label={`Add feedback for line ${index + 1}`}
                  >
                    Add Feedback
                  </Button>
                )}
              </button>
              {inlineFeedback[index + 1] && (
                <div
                  className="w-full flex"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-[#232B3A] border border-[#006FFF]  text-md rounded shadow-lg text-xs text-white px-4 py-2 flex flex-col w-full mt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[14px] text-[#8AB4F8]">
                        Feedback
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          className="text-[#006FFF] bg-transparent hover:underline p-0 h-auto min-w-0"
                          onClick={() => onEditFeedback(index + 1)}
                          tabIndex={0}
                          aria-label={`Edit feedback for line ${index + 1}`}
                        >
                          Edit
                        </Button>
                        <Button
                          className="text-destructive bg-transparent hover:underline p-2 h-auto min-w-0"
                          onClick={() => onRemoveFeedback(index + 1)}
                          type="button"
                          tabIndex={0}
                          aria-label={`Remove feedback for line ${index + 1}`}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="text-base-light-white text-[14px] break-words">
                      {inlineFeedback[index + 1]}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </code>
    </pre>
  </div>
);
