"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { SheetWrapper } from "../../components/sheet-wrapper";

interface LessonCardMenuProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const LessonCardMenu = ({
  onView,
  onEdit,
  onDelete,
}: LessonCardMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[190px]">
        <DropdownMenuItem onClick={onView} className="cursor-pointer">
          <Eye className="h-8 w-8 m2-3" />
          View
        </DropdownMenuItem>
        <SheetWrapper
          headerDescription="Editing skill tags"
          headerTitle="Edit"
          trigger={
            <DropdownMenuItem onClick={onEdit} className="cursor-pointer p-2">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
          }
        >
          <div>Test contents</div>
        </SheetWrapper>
        <Separator
          orientation="horizontal"
          className="my-1 text-gray-stroke-strong"
        />
        <DropdownMenuItem
          onClick={onDelete}
          className="cursor-pointer text-red-text focus:text-red-text "
        >
          <Trash2 className="h-4 w-4 mr-2 text-red-text focus:text-red-text" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
