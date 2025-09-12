import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const CustomDropdown: React.FC<
  React.PropsWithChildren<{
    trigger: React.ReactNode;
  }>
> = ({ trigger, children }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[190px]">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
