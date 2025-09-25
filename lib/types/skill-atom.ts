
export type SkillAtom = {
  id: string;
  name: string;
  description: string;
  objectives: string;
  estimatedHours: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  moodlePageId: number;
};

export type apiResponse = {
  status: boolean
  message: string
  data: {
    items: SkillAtom[]
    page: number
    size: number
    totalElements: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
  errors: unknown
}
export type LessonContentsResponse = {
  id: string;
  course: number;
  name: string;
  intro: string;
  courseModule: number;
  content: string;
}