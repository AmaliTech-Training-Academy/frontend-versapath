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
      <SelectTrigger className="max-w-[180px] w-fit">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectComponent>
  );
};
