"use client";
import React from "react";
import type { DetailedSubmission } from "@/lib/types/submissions";
import { SubmissionDetailPage as SubmissionDetailComponent } from "./components/submission-detail-page";

// Mock data - replace with actual data fetching
const mockSubmission: DetailedSubmission = {
  id: 1,
  title: "React Component Lab",
  type: "Code Lab",
  status: "Submitted",
  author: "Sarah Williams",
  date: "Sep 23. 2025, 10:30",
  submittedAt: "Sep 23. 2025, 10:30",
  // lastUpdated: "Sep 23. 2025, 10:30",
  description:
    "Build a reusable component library with proper TypeScript definitions",
  tags: ["React", "Typescript", "Components"],
  reviewerNotes:
    "Great job! The code is clean and well-documented. Consider adding more unit tests.",
  timeline: [
    {
      date: "Sep 23. 2025, 10:30",
      action: "Submitted",
      description: "Submission created and sent for review",
      user: "Sarah Williams",
    },
  ],
  code: `// App.js\nimport React, { useState, useEffect } from 'react';\nimport { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';\nimport Login from './components/Login';\nimport Dashboard from './components/Dashboard';\nimport { isAuthenticated, getToken } from './utils/auth';\nfunction App() {\n  const [authenticated, setAuthenticated] = useState(false);\n  useEffect(() => {\n    setAuthenticated(isAuthenticated());\n  }, []);\n  if (!authenticated) {\n    return <Login />;\n  }\n  return (\n    <Router>\n      <Routes>\n        <Route path="/" element={<Dashboard />} />\n      </Routes>\n    </Router>\n  );\n}\nexport default App;`,
  language: "javascript",
  githubUrl: "https://github.com/example/repo",
};

// Next.js route handler for submission detail page
type SubmissionDetailPageProps = {
  params: { submissionId: string };
};

export default function SubmissionDetailPage({ params,}: SubmissionDetailPageProps) {
 
  return <SubmissionDetailComponent submission={mockSubmission} />;
}
