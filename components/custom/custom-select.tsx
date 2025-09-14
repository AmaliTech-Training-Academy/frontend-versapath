import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
interface CustomSelectProps {
  label: string;
  selectValues?: string[] | { id: string; name: string }[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}
export const CustomSelect: React.FC<CustomSelectProps> = ({
  selectValues,
  value,
  onChange,
  label,
  disabled,
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Select onValueChange={onChange} value={value || ""} disabled={disabled}>
        <FormControl>
          <SelectTrigger className="w-full h-auto py-2">
            <SelectValue
              placeholder={"Select a " + label.toLocaleLowerCase()}
            />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="border-none bg-base-light-white">
          {selectValues?.map((item) => (
            <SelectItem
              key={typeof item === "string" ? item : item.id}
              value={typeof item === "string" ? item : item.id}
              className="capitalize"
            >
              {typeof item === "string" ? item : item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage className="transition-all -mt-1 text-xs" />
    </FormItem>
  );
};
