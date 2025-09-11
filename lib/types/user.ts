import { ApiResponse, User } from "./api";

export interface CommonUpdateDialogProps {
  title: string;
  description: string;
  placeholder: string;
  options: string[];
  currentValue: string;
  userId: string;
  triggerButton: React.ReactNode;
  updateFunction: (params: {
    userId: string;
    [key: string]: string;
  }) => Promise<ApiResponse<User>>;
  updateKey: string;
  mutateKeys?: string;
  successMessage?: string;
  errorMessage?: string;
}
