import { ProfficiencyLevels, Roles } from "./";
import { SkillAtom } from "./skill-atom";
export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
}
export interface User {
  id: string;
  userId?: string;
  email: string;
  username: string;
  role: Roles;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
  phoneNumber?: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  requiresOnboarding?: boolean;
}

export interface Cluster {
  id: string;
  name: string;
  type: string;
  description: string;
  imageName: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string | null;
}

export interface Route {
  id: string;
  talentRouteId: string;
  routeName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  totalTracks: number;
  tracks?: {
    id: string;
    growthTrackId: string;
    trackName: string;
    description: string;
    sequenceOrder: number;
    totalCapsules: number;
  }[];
}

export interface Track {
  id: string;
  growthTrackId: string;
  trackName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  totalCapsules: number;
  capsules?: {
    id: string;
    skillCapsuleId: string;
    capsuleName: string;
    description: string;
    difficultyLevel: DifficultyLevel;
    proficiencyLevel: ProficiencyLevel;
    sequenceOrder: number;
    totalAtoms: number;
  }[];
}

export interface MyRoadmap {
  learnerId: string;
  roadmapId: string;
  talentRoutId: string;
  routeName: string;
  routeDescription: string;
  enrollmentStatus: "ACTIVE" | "COMPLETED" | "DROPPED";
  overallProgressPercentage: number;
  enrolledAt: string;
}

export interface MyTrack {
  trackProgressId: string;
  trackId: string;
  trackName: string;
  description: string;
  sequenceOrder: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  progressPercentage: number;
  isUnlocked: boolean;
  capsules: MyTrackCapsule[];
}

export interface MyTrackCapsule {
  capsuleProgressId: string;
  capsuleId: string;
  capsuleName: string;
  description: string;
  sequenceOrder: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  progressPercentage: number;
  isUnlocked: boolean;
}

export interface Capsule {
  id: string;
  skillCapsuleId: string;
  capsuleName: string;
  description: string;
  difficultyLevel: DifficultyLevel;
  proficiencyLevel: ProficiencyLevel;
  moodleCourseId: number;
  createdAt: string;
  updatedAt: string;
  totalAtoms: number;
  atoms?: {
    id: string;
    skillAtomId: string;
    atomName: string;
    description: string;
    sequenceOrder: number;
  }[];
}

export interface Atom {
  id: string;
  skillAtomId: string;
  name: string;
  description: string;
  moodleModuleId: number;
  moodlePageId: number;
  createdAt: string;
  updatedAt: string;
}

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";
export type ProficiencyLevel = "L1" | "L2" | "L3" | "L4";

export type ApiErrors = string[] | null;
export type resWithoutData = Record<string, string>;

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ListData<T> {
  items: T[];
  pagination: PageInfo;
}

export interface ItemData<T> {
  item: T;
}

export type ApiResponse<TData, TError = ApiErrors> = {
  // status: number;
  success: boolean;
  message?: string;
  data?: TData | null;
  errors?: TError;
};
export interface FetchedRolesProps {
  role: string;
  id: string;
}
export interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
  status: Status;
}
export interface SingleSkillResponse {
  id: string;
  name: string;
  description: string;
  objectives: string;
  proficiencyLevel: ProfficiencyLevels | null;
  status: Omit<Status, "PENDING">;
  difficulty: string;
  estimatedHours: number;
  skillAtoms: SkillAtom[];
  tags: Pick<Tag, "id" | "name">[];
  clusters: Pick<Cluster, "id" | "name">[];
  image: string | null;
  categoryType: string;
  createdAt: string;
  updatedAt: string | null;
}
