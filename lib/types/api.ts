import { Roles } from "./";
export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: Roles;
  firstName: string;
  lastName: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Cluster {
  id: string;
  name: string;
  type: string;
  description: string;
  imageName: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string | null;
}

export type FieldErrors = Record<string, string[]>[];
export type ApiErrors = FieldErrors | null;
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

export interface LoginData<T> {
  item: T;
  tokenType: string;
  accessToken: string;
  expiresIn: number;
}

export type ApiResponse<TData, TError = ApiErrors> = {
  status: boolean;
  message?: string;
  data?: TData | null;
  // errors?: TError | null;
  errors?: TError | string[] | null;
};