import { Roles } from "./";
export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: Roles;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: Record<string, T> | null;
  errors: Record<string, string> | null;
}
