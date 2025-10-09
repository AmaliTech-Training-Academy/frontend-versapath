import { useSession } from "next-auth/react";
import { useGetMyRoadmap } from "../api/skills";
import { useTrack } from "../api/use-track";
import { SKillStatus } from "../types/api";
import { Roles } from "../types";

export const useProgressMetadata = (skillId: string) => {
  const { data: userSession } = useSession();
  const learnerId =
    userSession?.user.role === Roles.LEARNER ? userSession.user.userId : "";
  const { track } = useTrack(learnerId);
  const { roadmap } = useGetMyRoadmap();
  const capsules = track?.capsules ?? [];
  const matchingCapsule = capsules.find((c) => c.capsuleId === skillId);
  const status = matchingCapsule?.status;
  const lastCompletedIndex = capsules.reduceRight(
    (idx, c, i) => (idx === -1 && c.status === SKillStatus.COMPLETED ? i : idx),
    -1
  );

  const nextCapsule = capsules[lastCompletedIndex + 1];
  const isNextInLine = nextCapsule?.capsuleId === skillId;
  const startLabel =
    status === SKillStatus.NOT_STARTED
      ? "Start"
      : status === SKillStatus.IN_PROGRESS
      ? "Continue"
      : "View";

  const isDisabled = status === SKillStatus.NOT_STARTED && !isNextInLine;

  return {
    status,
    isNextInLine,
    startLabel,
    isDisabled,
    roadmap,
    track,
    matchingCapsule,
  };
};
