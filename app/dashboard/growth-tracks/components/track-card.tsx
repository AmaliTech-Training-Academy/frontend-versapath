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

export const TrackCard = ({
  growthTrack: { name, description, imageName, capsuleNumber },
}: {
  growthTrack: Omit<GrowthTrack, "capsules"> & { capsuleNumber: number };
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
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
                <button className="custom-dropdown-item">
                  <PenBox size={20} />
                  Edit
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button className="custom-dropdown-item">
                  <Plus />
                  Add growth tracks
                </button>
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
        onConfirm={() => {}}
        loading={false}
        preventCloseOnConfirm={true}
        dialogClose={true}
      />
    </article>
  );
};
