import image from "@/public/images/category-placeholder.jpg";
import Image from "next/image";
import { GrowthTrack } from "@/lib/types/growth-track";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { BookOpen, MoreVertical, PenBox, Plus, Trash2 } from "lucide-react";
import { CustomDropdown } from "@/components/custom/custom-dropdown";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { SelectableItemsList } from "@/components/custom/selectable-items-list";
import { useFetchSkills } from "@/lib/api/skills";
import { SheetWrapper } from "../../components/sheet-wrapper";
import {
  useFetchSingleTrack,
  updateTrackSkills,
  deleteGrowthTrack,
} from "@/lib/api/growth-track";
import { toast } from "sonner";
import { mutate } from "swr";

export const TrackCard = ({
  growthTrack: { id, name, description, image: imageName, capsuleNumber },
}: {
  growthTrack: Omit<GrowthTrack, "capsules"> & {
    capsuleNumber: number;
  };
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    skills: fetchedSkills,
    isFetchingSkills,
    fetchSkillsError: skillsError,
  } = useFetchSkills();
  const { singleTrack } = useFetchSingleTrack(id);
  const selectedSkillsIds = singleTrack?.data?.item.capsules.map(
    (skill) => skill.id
  );
  const allSkills = fetchedSkills?.data?.items;
  const handleDeleteTrack = async () => {
    // Implement delete functionality here
    setIsDeleting(true);
    try {
      const response = await deleteGrowthTrack(id);
      if (!response.success) {
        toast.error(
          response.message || "Failed to delete growth track. Please try again."
        );
        setIsDeleting(false);
        return;
      }
      toast.success(response.message || "Growth track deleted successfully");
      setDialogOpen(false);
      mutate(
        (key) => typeof key === "string" && key.startsWith("/growth-tracks")
      );
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <article aria-label={`Category: ${name}`} className="w-full h-fit">
      <div className="w-full h-full shadow-lg rounded-b-xl">
        <Image
          src={imageName ?? image}
          alt={name}
          width={1000}
          height={667}
          className="min-h-[240px] object-cover"
        />
        <div className="flex flex-col justify-between w-full h-full px-2 py-3 space-y-4">
          <div className="flex-1 w-full h-full space-y-1">
            <p className="w-full text-lg font-semibold text-gray-text-strong line-clamp-1">
              {name}
            </p>
            <p className="text-sm text-gray-text-weak line-clamp-1 min-h-5">
              {!description ? (
                <span className="text-xs italic">No description</span>
              ) : (
                description
              )}
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="flex items-center gap-1 text-xs">
              <BookOpen size={18} strokeWidth={1.2} />
              {capsuleNumber} {capsuleNumber > 1 ? "skills" : "skill"}
            </p>
            <CustomDropdown
              trigger={
                <Button size={"icon"} variant={"ghost"}>
                  <MoreVertical />
                </Button>
              }
            >
              <DropdownMenuItem asChild>
                <button
                  className="custom-dropdown-item"
                  onClick={() => toast.info("Feature coming soon!")}
                >
                  <PenBox size={20} />
                  Edit
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <SheetWrapper
                  headerTitle={`Add Skills to ${name}`}
                  headerDescription=""
                  trigger={
                    <button className="custom-dropdown-item">
                      <Plus />
                      Add skills
                    </button>
                  }
                >
                  <SelectableItemsList
                    items={(allSkills || []).map((skill) => ({
                      id: skill.id,
                      name: skill.name,
                      estimatedHours: skill.estimatedHours,
                    }))}
                    selectedItemIds={selectedSkillsIds || []}
                    loading={isFetchingSkills}
                    error={skillsError}
                    parentId={id}
                    itemType="Skills"
                    itemTypeSingular="skill"
                    onUpdate={({ existingIds, selectedIds }) =>
                      updateTrackSkills({
                        existingIds,
                        selectedIds,
                        trackId: id,
                      })
                    }
                    mutateKey={`/growth-tracks`}
                    searchPlaceholder="Search skills by name"
                    showEstimatedHours={true}
                  />
                </SheetWrapper>
              </DropdownMenuItem>
              <Separator className="my-1" />
              <DropdownMenuItem asChild>
                <button
                  className="items-center justify-start w-full text-red-text focus:text-red-text"
                  onClick={() => setDialogOpen(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2 cursor-pointer text-red-text focus:text-red-text " />
                  Delete
                </button>
              </DropdownMenuItem>
            </CustomDropdown>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={dialogOpen}
        title="Delete growth track?"
        description="Are you sure you want to delete this growth track? This action is irreversible."
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDeleteTrack}
        loading={isDeleting}
        preventCloseOnConfirm={true}
        dialogClose={true}
      />
    </article>
  );
};
