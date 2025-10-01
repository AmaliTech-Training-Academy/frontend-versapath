import React from "react";

interface FeedbackSummaryProps {
  inlineFeedback: Record<number, string>;
}

export const FeedbackSummary: React.FC<FeedbackSummaryProps> = ({
  inlineFeedback,
}) =>
  Object.keys(inlineFeedback).length > 0 ? (
    <div className="mt-8">
      <h4 className="font-semibold mb-2 text-gray-text-strong">
        Inline Feedback Summary
      </h4>
      <div className="space-y-2">
        {Object.entries(inlineFeedback).map(([line, comment]) => (
          <div
            key={`feedback-summary-${line}`}
            className="flex items-center bg-base-light-background rounded p-3 text-sm"
          >
            <span className="font-mono text-xs bg-base-dark-black text-green-text mr-2 p-1 rounded">
              Line {line}:
            </span>
            <span className="flex-1 text-gray-text-strong">{comment}</span>
          </div>
        ))}
      </div>
    </div>
  ) : null;
