import { apiRequest } from "./api-request";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const authApi = {
  resetPassword: async (email: string) => {
    const result = await apiRequest<{ message: string }>(
      "/auth/forgot-password",
      "POST",
      { email }
    );

    if (!result.success) {
      throw new ApiError(400, result.message || "Failed to send reset email");
    }

    return result.data;
  },

  updatePassword: async (
    token: string,
    data: { password: string; confirmPassword: string }
  ) => {
    const result = await apiRequest<{ message: string }>(
      `/auth/reset-password?reset=${token}`,
      "POST",
      {
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
      }
    );
    if (!result.success) {
      throw new ApiError(400, result.message || "Failed to update password");
    }

    return result.data;
  },
};
