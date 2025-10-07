import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MyTrackCapsule } from "./types/api";
import { LearningMetricsProps } from "./types/growth-track";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractErrorMessage(
  errors?: string[],
  fallback?: string
): string {
  if (errors && errors.length > 0) {
    return errors[0];
  }

  return fallback || "Unable to log in. Please try again.";
}

export const extractLearningMetrics = (tracks: MyTrackCapsule[]) => {
  return tracks.reduce((acc, track) => {
    acc[track.capsuleId] = {
      progress: track.progressPercentage,
      isUnlocked: track.isUnlocked,
      status: track.status,
    };
    return acc;
  }, {} as Record<string, LearningMetricsProps>);
};
