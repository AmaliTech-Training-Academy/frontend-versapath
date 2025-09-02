import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { usersMockData } from "./mocks/users";
// import { ApiErrors } from "./types/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getUserById(userId: string) {
  return (
    usersMockData.find((user) => user.id.toString() === userId) || {
      id: -1,
      user: "Unknown",
      email: "email@gmail.com",
      role: "Learner",
      status: "Inactive",
      joinDate: "N/A",
      stack: "N/A",
    }
  );
}

export function extractErrorMessage (errors?: string[], fallback?: string): string {
  if (errors && errors.length > 0) {
    return errors[0];
    // const firstMap = errors[0];
    // const firstKey = Object.keys(firstMap)[0];
    // const firstMsg = firstKey ? firstMap[firstKey]?.[0] : undefined;
    // if (firstMsg) return firstMsg;
  }
  return fallback || "Unable to log in. Please try again.";
}