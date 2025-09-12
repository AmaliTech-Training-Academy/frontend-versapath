
export type SkillAtom = {
  id: string
  name: string
  description: string
  objectives: string
  estimatedHours: number
  status: "ACTIVE" | "INACTIVE" 
  createdAt: string
}

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

