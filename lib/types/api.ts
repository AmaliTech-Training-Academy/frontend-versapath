export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: 'LEARNER' | 'MENTOR' | 'MANAGER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Cluster {
  id: string;
  name: string;
  type: string;
  status: 'ACTIVE' | 'INACTIVE';
  description: string;
  createdAt: string;
}

export type FieldErrors = Record<string, string[]>[];
export type ApiErrors = FieldErrors | null;

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
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ItemData<T> {
  item: T;
}

export type ApiResponse<TData, TError = ApiErrors> = {
  status: boolean;
  message?: string;
  data?: TData | null;
  errors?: TError | null;
};