import { signOut } from "next-auth/react";
import { ApiResponse } from "../types/api";

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type BodyType = FormData | Record<string, unknown> | Array<unknown>;

const isFormData = (b: unknown): b is FormData =>
  typeof FormData !== "undefined" && b instanceof FormData;

const isBlobOrFile = (b: unknown): b is Blob | File =>
  (typeof Blob !== "undefined" && b instanceof Blob) ||
  (typeof File !== "undefined" && b instanceof File);

export const apiRequest = async <T>(
  endpoint: string,
  method: ApiMethod,
  data?: BodyType
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
    if (isFormData(data)) {
      options.body = data;
    } else if (isBlobOrFile(data)) {
      options.headers = {
        ...options.headers,
        "Content-Type": "application/octet-stream",
      };
      options.body = data;
    } else {
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(data);
    }
  }

  const response = await fetch(url, options);
  const isAuthEndpoint = endpoint.startsWith("/auth");
  const isLogoutEndpoint = endpoint === "/auth/logout";
  if (isLogoutEndpoint && response.status === 401) {
    return { success: true, message: "Logged out" } as ApiResponse<T>;
  }
  if (response.status === 401 && !isAuthEndpoint) {
    const refresh = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    ).then((res) => res.json());
    if (refresh.success) {
      return await fetch(url, options).then((res) => res.json());
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      await signOut({ redirectTo: "/login" });
    }
  }

  return await response.json();
};
