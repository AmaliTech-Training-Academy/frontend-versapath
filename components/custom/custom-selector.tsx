import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export const Select: React.FC<{
  placeholder: string;
  options: { value: string; label: string }[];
  handlevalueChange?: (value: string) => void;
}> = ({ placeholder, options, handlevalueChange }) => {
  return (
    <SelectComponent onValueChange={handlevalueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        {options.map(({ value, label }) => (
          <SelectItem value={value}>{label}</SelectItem>
        ))}
      </SelectContent>
    </SelectComponent>
  );
};
