import { ApiResponse } from "../types/api";

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const apiRequest = async <T>(
  endpoint: string,
  method: ApiMethod,
  data?: unknown
): Promise<ApiResponse<T>> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      Accept: "*/*",
    },
    credentials: "include",
  };

  if (data !== undefined) {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options).then((res) => res.json());
  if (response.message === "Authentication required") {
    const refresh = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    ).then((res) => res.json());
    if (refresh.success)
      return await fetch(url, options).then((res) => res.json());
  }
  return response;
};
