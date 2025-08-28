import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ApiErrors } from "./types/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractErrorMessage (errors?: ApiErrors, fallback?: string): string {
  if (errors && errors.length > 0) {
    const firstMap = errors[0];
    const firstKey = Object.keys(firstMap)[0];
    const firstMsg = firstKey ? firstMap[firstKey]?.[0] : undefined;
    if (firstMsg) return firstMsg;
  }
  return fallback || "Unable to log in. Please try again.";
}