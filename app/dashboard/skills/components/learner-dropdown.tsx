"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTrack } from "@/lib/api/use-track";
import { SKillStatus } from "@/lib/types/api";
import { Eye, SquarePlay } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const LearnerDropdown = ({ skillId }: { skillId: string }) => {
  const router = useRouter();
  const { track } = useTrack();
  console.log("My track: ", track);
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

  // Disabled if not next in line & not started
  const isDisabled = status === SKillStatus.NOT_STARTED && !isNextInLine;

  const handleStartSkill = () => {
    if (!status) return; // capsule not found
    if (isDisabled) return; // blocked start
    if (status === SKillStatus.NOT_STARTED && isNextInLine) {
      // TODO: trigger API/mutation to start skill
      router.push(`/dashboard/skills/${skillId}`);
    }
  };

  return (
    <>
      <DropdownMenuItem asChild>
        <button
          className="justify-start w-full disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleStartSkill}
          disabled={isDisabled}
        >
          <SquarePlay />
          {startLabel}
        </button>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link
          href={`/dashboard/skills/${skillId}`}
          className="justify-start w-full"
        >
          <Eye />
          View details
        </Link>
      </DropdownMenuItem>
    </>
  );
};
