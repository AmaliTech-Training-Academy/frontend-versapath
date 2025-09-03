
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const authApi = {
  resetPassword: async (email: string) => {
    const response = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error || "Failed to send reset email"
      );
    }

    return data;
  },

  updatePassword: async (
    token: string,
    data: { password: string; confirmPassword: string }
  ) => {
    const { confirmPassword, password } = data;
    const response = await fetch(
      `${API_BASE}/auth/reset-password?reset=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: password, confirmPassword }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new ApiError(
        response.status,
        result.error || "Failed to update password"
      );
    }

    return result;
  },
};
