"use client";
import React from "react";
import { Input } from "../ui/input";
import { FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormField } from "../ui/form";

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
  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <FormItem className="space-y-1">
      <FormLabel className="font-semibold text-sm text-gray-text-strong/90">
        {label}
      </FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            {...field}
            type={inputType}
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
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </FormControl>
      <FormMessage className="transition-all" />
    </FormItem>
  );
};
