import useSWR from "swr";
import { ApiErrors, ApiResponse, PageInfo } from "../types/api";
import type { User } from "../types/api";

export const Authorization =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjMTMwMTkwZC03NmFmLTQzYjQtYWQ5My0zMzQxMzU2ZjY0NjUiLCJqdGkiOiJlNGY1ZjQwZi1lYjI2LTQ1MTItYmE1ZS1iMGM2Y2NhOWYxZjgiLCJlbWFpbCI6ImFkbWluQHZlcnNhcGF0aC5jb20iLCJyb2xlIjoiQURNSU4iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzU2ODM2MzA3LCJleHAiOjE3NTY4MzcyMDd9.r6FmUBG15qhPegnDupl2yGWZgKp8QQjwYyWNGvGhBwH8e6GC2IKTU8ek-nbSVASJhcPch-4auer-ydD3N7Fe-Q";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

interface UsersResponse {
  items: User[];
  pagination: PageInfo;
}
const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization,
    },
  }).then((res) => res.json());

export function useFetchUsers(pageIndex: number = 0) {
  const url = baseUrl ? `${baseUrl}/users?page=${pageIndex}` : null;

  // Always call the hook; SWR will skip when key is null
  const { data, error, isLoading } = useSWR<
    ApiResponse<UsersResponse, ApiErrors>,
    ApiErrors
  >(url, fetcher);

  const configError = !url
    ? ({ message: "API URL not defined" } as unknown as ApiErrors)
    : null;

  return {
    users: data,
    isFetchingUsers: url ? isLoading : false,
    fetchUsersError: configError ?? error,
  };
}

export const inviteUser = async (data: {
  email: string;
  roleId: string;
}): Promise<ApiResponse<User, ApiErrors>> => {
  const url = `${baseUrl}/register/invite-user`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Error inviting user:", error);
    return {
      success: false,
      message: "Network error occurred while inviting user.",
      errors: ["Network error occurred. Please try again later."],
    };
  }
};
