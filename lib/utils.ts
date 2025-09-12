import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function extractErrorMessage (errors?: string[], fallback?: string): string {
  if (errors && errors.length > 0) {
    return errors[0];
  }
  
  return fallback || "Unable to log in. Please try again.";
}