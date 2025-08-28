"use client";
import React from "react";
import { Input } from "../ui/input";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  useFormField,
} from "../ui/form";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
}
export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  className,
  placeholder,
  type = "text",
  ...field
}) => {
  const { error } = useFormField();
  const [showPassword, setShowPassword] = React.useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType && showPassword ? "text" : type;
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const id = field.name || field.id || `input-${label.toLowerCase()}`;
  return (
    <FormItem className="space-y-1">
      <FormLabel
        htmlFor={id}
        className="my-0 text-sm font-semibold text-gray-text-strong/90"
      >
        {label}
      </FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            {...field}
            id={id}
            name={field.name}
            type={inputType}
            aria-label={label}
            data-error={!!error}
            placeholder={placeholder || "Type here..."}
            className={cn(
              "w-full h-10 rounded-md border-gray-stroke-strong/30 py-2 px-3 data-[error=true]:border-destructive data-[error=true]:ring-destructive/20",
              className
            )}
          />
          {isPasswordType && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={cn(
                "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              )}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </FormControl>
      <FormMessage className="transition-all" />
    </FormItem>
  );
};
