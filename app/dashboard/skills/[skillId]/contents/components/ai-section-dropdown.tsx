import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  
  MoreVertical,
  PenBoxIcon,
  Trash2,
} from "lucide-react";
import React from "react";

export const AISectionDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8 ">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[190px]">
        <DropdownMenuItem className="cursor-pointer">
          <PenBoxIcon size={20} />
          New chat
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 cursor-pointer">
          <Clock size={20} />
          Chat History
        </DropdownMenuItem>
        <Separator
          orientation="horizontal"
          className="my-1 text-gray-stroke-strong"
        />
        <DropdownMenuItem className="cursor-pointer text-red-text focus:text-red-text ">
          <Trash2 className="w-4 h-4 mr-2 text-red-text focus:text-red-text" />
          Clear chat
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
