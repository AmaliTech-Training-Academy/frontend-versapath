"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useProgressMetadata } from "@/lib/hooks/use-progress-metadata";
import { SKillStatus } from "@/lib/types/api";
import { Eye, SquarePlay } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const LearnerDropdown = ({ skillId }: { skillId: string }) => {
  const router = useRouter();
  const { status, isNextInLine, startLabel, isDisabled } =
    useProgressMetadata(skillId);
  const handleStartSkill = () => {
    if (
      status === SKillStatus.IN_PROGRESS ||
      status === SKillStatus.COMPLETED
    ) {
      router.push(`/dashboard/skills/${skillId}`);
      return;
    }
    if (isDisabled) return;
    if (status === SKillStatus.NOT_STARTED && isNextInLine) {
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
