"use client";
import React from "react";
import { Textarea } from "../ui/textarea";
import { FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";

interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  placeholder?: string;
}

export const CustomTextarea: React.FC<CustomTextareaProps> = ({
  label,
  className,
  placeholder,
  ...field
}) => {
  const id = field.name || field.id || `textarea-${label.toLowerCase()}`;

  return (
    <FormItem>
      <FormLabel
        htmlFor={id}
        className="font-semibold text-sm text-gray-text-strong/90"
      >
        {label}
      </FormLabel>
      <FormControl>
        <div className="relative">
          <Textarea
            {...field}
            id={id}
            aria-label={label}
            placeholder={placeholder || "Type here..."}
            className={cn(
              "w-full h-10 rounded-md border-gray-stroke-strong/30 py-2 px-3 data-[error=true]:border-destructive data-[error=true]:ring-destructive/20",
              className
            )}
          />
        </div>
      </FormControl>
      <FormMessage className="transition-all -mt-1 text-xs" />
    </FormItem>
  );
};
