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
          const lineNumber = index + 1;
          const isSelected = selectedLine === lineNumber;
          return (
            <div key={`code-row-${lineNumber}`} className="flex flex-col">
              <button
                type="button"
                className={
                  `whitespace-pre flex items-start group relative w-full text-left ` +
                  (isSelected ? " bg-[#006FFF1A]" : "")
                }
                onClick={() => setSelectedLine(isSelected ? null : lineNumber)}
                aria-label={`Select line ${lineNumber}`}
                tabIndex={0}
                style={{ cursor: "pointer" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedLine(isSelected ? null : lineNumber);
                  }
                }}
              >
                <span className="font-mono text-xs text-gray-400 mr-2">
                  {lineNumber}
                </span>
                <span className="flex-1">{line || " "}</span>
                {isSelected && !inlineFeedback[lineNumber] && (
                  <Button
                    className="ml-4 text-xs bg-base-light-background text-white px-2 py-1 rounded hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddFeedback(lineNumber);
                    }}
                    tabIndex={0}
                    aria-label={`Add feedback for line ${lineNumber}`}
                  >
                    Add Feedback
                  </Button>
                )}
              </button>
              {inlineFeedback[lineNumber] && (
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
                          onClick={() => onEditFeedback(lineNumber)}
                          tabIndex={0}
                          aria-label={`Edit feedback for line ${lineNumber}`}
                        >
                          Edit
                        </Button>
                        <Button
                          className="text-destructive bg-transparent hover:underline p-2 h-auto min-w-0"
                          onClick={() => onRemoveFeedback(lineNumber)}
                          type="button"
                          tabIndex={0}
                          aria-label={`Remove feedback for line ${lineNumber}`}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="text-base-light-white text-[14px] break-words">
                      {inlineFeedback[lineNumber]}
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
