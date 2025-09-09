import useSWR from "swr";
import { ApiErrors, ApiResponse } from "../types/api";
import type { ListData, User } from "../types/api";
import { apiRequest } from "./api-request";

export const Authorization = process.env.NEXT_PUBLIC_AUTHORIZATION!;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const fetcher = (url: string) => apiRequest<ListData<User>>(url, "GET");
const singleUserFetcher = (url: string) => apiRequest<User>(url, "GET");
export function useFetchUsers(pageIndex: number = 0) {
  const endpoint = `/users?page=${pageIndex}`;

  const { data, error, isLoading } = useSWR(endpoint, fetcher);

  return {
    users: data,
    isFetchingUsers: isLoading,
    fetchUsersError: error,
  };
}

export const inviteUser = async (data: {
  email: string;
  roleId: string;
}): Promise<ApiResponse<User, ApiErrors>> => {
  const endpoint = "/register/invite-user";
  try {
    const response = await apiRequest<User>(endpoint, "POST", data);
    return response;
  } catch (error) {
    return {
      success: false,
      message: "Network error occurred while inviting user.",
      errors: [
        "Network error occurred. Please try again later.",
        JSON.stringify(error),
      ],
    };
  }
};

export const completeUserRegister = async (
  token: string,
  data: Partial<User> & { password: string; confirmPassword: string }
): Promise<ApiResponse<User, ApiErrors>> => {
  try {
    const response = await apiRequest<User>(
      `/register/complete-registration?invite=${token}`,
      "POST",
      data
    );

    return response;
  } catch (error) {
    return {
      success: false,
      message: "Network error occurred while registering user.",
      errors: [
        "Network error occurred. Please try again later.",
        JSON.stringify(error),
      ],
    };
  }
};

export const useFetchSingleUser = (id: string) => {
  const endpoint = `/users/${id}`;

  const { data, error, isLoading } = useSWR(endpoint, singleUserFetcher);
  return {
    user: data,
    isFetchingSingleUser: isLoading,
    fetchUserError: error,
  };
};
