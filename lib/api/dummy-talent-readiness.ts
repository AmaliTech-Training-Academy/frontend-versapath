export const dummyTalentReadiness = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 2).toString(),
  name: `Learner ${i + 2}`,
  skillProgress: `${Math.floor(Math.random() * 15) + 1}/15`,
  talentRoute: i % 2 === 0 ? "Frontend Development" : "Backend Development",
  readinessStatus: i % 2 === 0 ? "Ready" : "Not Ready",
  assessmentPerformance: Math.floor(Math.random() * 100),
  projectsSubmissions: Math.floor(Math.random() * 10),
  skillTags: ["JavaScript", "React", "CSS", "HTML", "TypeScript"],
}));
