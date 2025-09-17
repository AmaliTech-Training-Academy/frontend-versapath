"use client";
import { CustomDropdown } from "@/components/custom/custom-dropdown";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Eye, MoreVertical, PenBox, SquarePlay, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SheetWrapper } from "../../components/sheet-wrapper";
import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { toast } from "sonner";
import { SKill } from "@/lib/types/skills";
import { deleteSkill } from "@/lib/api/skills";
import { mutate } from "swr";
import { AddSkillForm } from "./add-skill-form";
import { useCheckRole } from "@/lib/hooks/use-check-role";

export const SkillCapsuleCardMenu: React.FC<{ skill: SKill }> = ({ skill }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { isLearner, isAdmin } = useCheckRole();
  const handleDeleteSkill = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteSkill(skill.id);
      if (!response.success) {
        toast.error(
          response.message || "Failed to delete skill. Please try again."
        );
        setIsDeleting(false);
        return;
      }
      toast.success(response.message || "Skill deleted successfully");
      setDialogOpen(false);
      mutate((key) => typeof key === "string" && key.startsWith("/capsules"));
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <CustomDropdown
        trigger={
          <Button variant={"ghost"} className="p-1" size={"icon"}>
            <MoreVertical />
          </Button>
        }
      >
        {isLearner && <StudentDropDown skillId={skill.id} />}
        {isAdmin && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/skills/${skill.id}`}
                className="w-full justify-start"
              >
                <Eye />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <SheetWrapper
                headerTitle="Edit Skill"
                headerDescription="Edit the skill details"
                trigger={
                  <button className="custom-dropdown-item">
                    <PenBox size={20} />
                    Edit
                  </button>
                }
              >
                <AddSkillForm />
              </SheetWrapper>
            </DropdownMenuItem>
            <Separator className="my-1" />
            <DropdownMenuItem asChild>
              <button
                className="w-full justify-start text-red-text focus:text-red-text"
                onClick={() => setDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-2 cursor-pointer text-red-text focus:text-red-text " />
                Delete
              </button>
            </DropdownMenuItem>
          </>
        )}
      </CustomDropdown>
      <ConfirmDialog
        open={dialogOpen}
        title="Delete Skill"
        description="Are you sure you want to delete this skill? This action cannot be undone."
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDeleteSkill}
        loading={isDeleting}
        preventCloseOnConfirm={true}
        dialogClose={true}
      />
    </>
  );
};

const StudentDropDown = ({ skillId }: { skillId: string }) => {
  return (
    <>
      <DropdownMenuItem asChild>
        <Link href={`#`} className="w-full justify-start">
          <SquarePlay />
          Start
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link
          href={`/dashboard/skills/${skillId}`}
          className="w-full justify-start"
        >
          <Eye />
          View details
        </Link>
      </DropdownMenuItem>
    </>
  );
};
