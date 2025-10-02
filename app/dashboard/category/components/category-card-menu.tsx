"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { SheetWrapper } from "../../components/sheet-wrapper";
import { EditCategoryForm } from "./edit-category-form";
import { Cluster } from "@/lib/types/api";

interface CategoryCardMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  category: Cluster;
  revalidateAction: () => void;
}

export const CategoryCardMenu: React.FC<CategoryCardMenuProps> = ({
  onEdit,
  onDelete,
  category,
  revalidateAction,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[170px]">
        <SheetWrapper
          headerDescription=""
          headerTitle="Edit Category"
          trigger={
            <button
              type="button"
              className="w-full flex items-center gap-2 cursor-pointer p-2 bg-transparent border-0 text-left hover:bg-gray-stroke-weak/40"
              tabIndex={0}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </button>
          }
        >
          <EditCategoryForm
            cluster={category}
            revalidateAction={revalidateAction}
          />
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
