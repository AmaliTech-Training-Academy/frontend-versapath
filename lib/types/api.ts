export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'LEARNER' | 'MENTOR' | 'MANAGER' | 'ADMIN';
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: Record<string, T>;
  errors: Record<string, string> | null;
}
