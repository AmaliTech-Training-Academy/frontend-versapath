import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiResponse } from "../types/api";
import { ApiMethod } from "./api-request";
export const apiServerRequest = async <T>(
  endpoint: string,
  method: ApiMethod,
  data?: unknown
): Promise<ApiResponse<T>> => {
  const cookieStore = await cookies();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${endpoint}`;

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  console.log("Making server request to:", url);

  const makeRequest = async (): Promise<Response> => {
    const options: RequestInit = {
      method,
      headers: {
        Accept: "*/*",
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
    };

    if (data !== undefined) {
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(data);
    }

    return fetch(url, options);
  };

  try {
    const response = await makeRequest();
    const responseData = await response.json();

    // If authentication fails, try refresh via our API route
    if (
      responseData.message === "JWT token is missing or invalid" ||
      response.status === 401
    ) {
      console.log("Authentication failed, attempting refresh via API route");

      // Call our internal refresh API
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh-token`,
        {
          method: "POST",
          headers: {
            Cookie: cookieHeader,
          },
        }
      );

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        if (refreshData.success) {
          console.log("Token refresh successful, retrying request");
          // Retry the original request
          const retryResponse = await makeRequest();
          return await retryResponse.json();
        }
      }

      // If refresh failed, redirect to login
      console.log("Token refresh failed, redirecting to login");
      redirect("/login");
    }

    return responseData;
  } catch (error) {
    console.error("Server API request failed:", error);
    throw new Error(`API request failed: ${error}`);
  }
};

// Alternative version that includes one retry attempt
export const apiServerRequestWithRetry = async <T>(
  endpoint: string,
  method: ApiMethod,
  data?: unknown,
  retryCount: number = 0
): Promise<ApiResponse<T>> => {
  const cookieStore = await cookies();
  const url = `${process.env.FRONTEND_URL}/api/v1/${endpoint}`;

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const options: RequestInit = {
    method,
    headers: {
      Accept: "*/*",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  };

  if (data !== undefined) {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    // If authentication fails and we haven't retried yet
    if (
      (responseData.message === "JWT token is missing or invalid" ||
        response.status === 401) &&
      retryCount === 0
    ) {
      // Try to refresh token manually
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            Cookie: cookieHeader,
          },
        }
      );

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        if (refreshData.success) {
          // Retry the original request
          return apiServerRequestWithRetry(
            endpoint,
            method,
            data,
            retryCount + 1
          );
        }
      }
      redirect("/login");
    }

    return responseData;
  } catch (error) {
    // Check if this is a Next.js redirect - if so, re-throw it
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    console.error("Server API request failed:", error);
    throw new Error(`API request failed: ${error}`);
  }
};
