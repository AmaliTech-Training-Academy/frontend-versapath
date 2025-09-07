import { Roles } from "./";
export interface User {
  userId: string;
  email: string;
  username: string;
  role: Roles;
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
  success: boolean;
  message?: string;
  data?: TData | null;
  errors?: TError;
};