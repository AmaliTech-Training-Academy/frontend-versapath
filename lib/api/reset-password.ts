export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export const authApi = {
  resetPassword: async (email: string) => {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(response.status, data.error || "Failed to send reset email")
    }

    return data
  },

  updatePassword: async (password: string, confirmPassword: string) => {
    const response = await fetch("/api/auth/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, confirmPassword }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(response.status, data.error || "Failed to update password")
    }

    return data
  },
}
