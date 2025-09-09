// lib/api/api-server.ts
import { cookies, headers } from "next/headers";
import { ApiResponse } from "../types/api";
import { User } from "next-auth";

export const apiServerRequest = async <T>(
  endpoint: string,
  method: string,
  data?: unknown
): Promise<ApiResponse<T>> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  const cookieHeader = (await cookies())
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  console.log("Coockies found: ", cookieHeader);
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

  const response = await fetch(url, options);
  return response.json();
};
