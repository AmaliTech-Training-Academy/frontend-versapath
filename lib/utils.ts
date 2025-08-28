import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { usersMockData } from "./mocks/users";

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
