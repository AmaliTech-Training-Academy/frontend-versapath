"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const PasswordInput = ({ label, error, ...props }: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      <div className="relative">
        <Input
          {...props}
          type={show ? "text" : "password"}
          className={`pr-10 ${error ? "border-2 border-red-text" : ""}`}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? (
            <EyeOff className="h-4 w-4 text-gray-stroke-strong" />
          ) : (
            <Eye className="h-4 w-4 text-gray-stroke-strong" />
          )}
        </button>
      </div>
      {error && <FormMessage>{error}</FormMessage>}
    </div>
  );
};
