import { DetailedSubmission } from "../types/submissions";

export const dummySubmissions = [
  {
    id:1,
    title: "React Component Lab",
    type: "Code Lab",
    status: "Submitted",
    statusColor: "",
    author: "Sarah Williams",
    date: "Sep 23. 2025, 10:30",
    description:
      "Build a reusable component library with proper TypeScript definitions",
    tags: ["React", "Typescript", "Components"],
  },
  { id:2,
    title: "React Authentication Lab",
    type: "Code Lab",
    status: "In Review",
    statusColor: "",
    author: "Sarah Williams",
    date: "Sep 23. 2025, 10:30",
    description: "Implement user authentication using React and JWT tokens",
    tags: ["JWT", "React", "Authenticatciation"],
  },
  { id:3,
    title: "React Component Lab",
    type: "Code Lab",
    status: "Completed",
    statusColor: "",
    author: "Sarah Williams",
    date: "Sep 23. 2025, 10:30",
    description:
      "Build a reusable component library with proper TypeScript definitions",
    tags: ["React", "Typescript", "Components"],
  },
   { id:4,
    title: "React Component Lab",
    type: "Code Lab",
    status: "Completed",
    statusColor: "",
    author: "Sarah Williams",
    date: "Sep 23. 2025, 10:30",
    description:
      "Build a reusable component library with proper TypeScript definitions",
    tags: ["React", "Typescript", "Components"],
  },
   { id:5,
    title: "React Component Lab",
    type: "Code Lab",
    status: "Completed",
    statusColor: "",
    author: "Sarah Williams",
    date: "Sep 23. 2025, 10:30",
    description:
      "Build a reusable component library with proper TypeScript definitions",
    tags: ["React", "Typescript", "Components"],
  },
   { id:6,
    title: "React Component Lab",
    type: "Code Lab",
    status: "Completed",
    statusColor: "",
    author: "Sarah Williams",
    date: "Sep 23. 2025, 10:30",
    description:
      "Build a reusable component library with proper TypeScript definitions",
    tags: ["React", "Typescript", "Components"],
  },
];



export const sampleDays = [
  {
    date: "2025-09-26",
    short: "FRI",
    day: "26"
  },
  {
    date: "2025-09-27",
    short: "SAT", 
    day: "27"
  },
  {
    date: "2025-09-28",
    short: "SUN",
    day: "28"
  },
  {
    date: "2025-09-29",
    short: "MON",
    day: "29"
  },
  {
    date: "2025-09-30",
    short: "TUE",
    day: "30"
  },
   {
    date: "2025-09-31",
    short: "WES",
    day: "31"
  },
   {
    date: "2025-10-01",
    short: "THU",
    day: "01"
  }
];

export const sampleAssessments = [
  {
    title: "React Advanced Patterns Lab",
    date: "2025-09-26",
    dateStr: "Friday, Sept 26 at 10:00 AM",
    type: "Code lab"
  },
   {
    title: "React Advanced Patterns Lab",
    date: "2025-09-26",
    dateStr: "Friday, Sept 26 at 10:00 AM",
    type: "Code lab"
  },
  {
    title: "React Advanced Patterns Lab",
    date: "2025-09-26",
    dateStr: "Friday, Sept 26 at 10:00 AM",
    type: "Code lab"
  },
   {
    title: "React Advanced Patterns Lab",
    date: "2025-09-26",
    dateStr: "Friday, Sept 26 at 10:00 AM",
    type: "Code lab"
  },
  
  {
    title: "React Advanced Patterns Quiz",
    date: "2025-09-26",
    dateStr: "Friday, Sept 26 at 2:00 PM", 
    type: "Quiz"
  },
  {
    title: "Science Lab Project",
    date: "2025-09-29",
    dateStr: "Monday, Sept 29 at 9:00 AM",
    type: "Project"
  },
  {
    title: "Science Lab Project",
    date: "2025-09-29",
    dateStr: "Monday, Sept 29 at 9:00 AM",
    type: "Project"
  },
  {
    title: "English Literature Exam",
    date: "2025-09-30",
    dateStr: "Tuesday, Sept 30 at 1:00 PM",
    type: "Exam"
  }
];

export const mockSubmission: DetailedSubmission = {
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