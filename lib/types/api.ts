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
  image?: string
  phoneNumber?: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
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

export interface LoginData<T> {
  item: T;
  tokenType: string;
  accessToken: string;
  expiresIn: number;
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
