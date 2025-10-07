"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FeedbackForm } from "@/lib/types/submissions"

interface FeedbackFormProps {
  onSubmit: (feedback: FeedbackForm) => void
  initialData?: Partial<FeedbackForm>
}

export function FeedbackForm({ onSubmit, initialData }: FeedbackFormProps) {
  const [score, setScore] = useState(initialData?.score?.toString() || "")
  const [finalStatus, setFinalStatus] = useState<"Passed" | "Needs Improvement">(initialData?.finalStatus || "Passed")
  const [comments, setComments] = useState(initialData?.comments || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      score: Number.parseInt(score) || 0,
      finalStatus,
      comments,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 ">
      <div className="space-y-4">
        <div>
          <Label htmlFor="score" className="text-sm font-medium">
            Score (0-100) *
          </Label>
          <Input
            id="score"
            type="number"
            min="0"
            max="100"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="mt-1 w-35"
            required
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Final Status *</Label>
          <RadioGroup
            value={finalStatus}
            onValueChange={(value) => setFinalStatus(value as "Passed" | "Needs Improvement")}
            className="mt-2 flex "
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Passed" id="passed" />
              <Label htmlFor="passed" className="text-sm">
                Passed
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Needs Improvement" id="needs-improvement" />
              <Label htmlFor="needs-improvement" className="text-sm">
                Needs Improvement
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="comments" className="text-sm font-medium">
            Feedback Comments *
          </Label>
          <Textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Provide detailed feedback on the submission..."
            className="mt-1 min-h-[100px]"
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" className="cursor-pointer">
          Tag to Presentation
        </Button>
        <Button type="submit" className="bg-brand-primary-stroke-strong cursor-pointer">
          Submit Feedback
        </Button>
      </div>
    </form>
  )
}
