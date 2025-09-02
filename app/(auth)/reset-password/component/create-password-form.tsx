"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader, Check, Star } from "lucide-react";
import { createPasswordSchema } from "@/lib/schemas/new-password";
import type { CreatePasswordForm } from "@/lib/schemas/new-password";
import {
  hasMinLength,
  hasUppercase,
  hasLowercase,
  hasNumber,
} from "@/lib/utils/password";
import { useRouter } from "next/navigation";
import { authApi, ApiError } from "@/lib/api/reset-password";
import { PasswordResetSuccess } from "./successs-message";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreatePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [apiError, setApiError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreatePasswordForm>({
    resolver: zodResolver(createPasswordSchema),
    mode: "onChange",
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const minLength = hasMinLength(password || "");
  const uppercase = hasUppercase(password || "");
  const lowercase = hasLowercase(password || "");
  const number = hasNumber(password || "");
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  const showPasswordValidation = password && password.length > 0;
  const showConfirmValidation = confirmPassword && confirmPassword.length > 0;

  const onSubmit = async (data: CreatePasswordForm) => {
    try {
      setApiError("");
      setSuccessMessage("");

      const response = await authApi.updatePassword(
        data.password,
        data.confirmPassword
      );
      setSuccessMessage(response.message);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };
  if (successMessage) {
    return <PasswordResetSuccess />;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-text flex justify-center mb-2">
          Create new password
        </h1>
        <p className="text-sm text-gray-text-weak">
          Your new password must be different from previous used passwords.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-text"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`pr-10 ${
                errors.password
                  ? "border-2 border-red-text"
                  : "border-gray-stroke-strong"
              }`}
              {...register("password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-stroke-strong" />
              ) : (
                <Eye className="h-4 w-4 text-gray-stroke-strong" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-text">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className={`pr-10 ${
                errors.confirmPassword
                  ? "border-2 border-red-text"
                  : "border-gray-stroke-strong"
              }`}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-stroke-strong" />
              ) : (
                <Eye className="h-4 w-4 text-gray-stroke-strong" />
              )}
            </button>
          </div>
          {/* Password match validation */}
          {showConfirmValidation && (
            <div className="text-xs">
              <div
                className={`flex items-center gap-2 ${
                  passwordsMatch
                    ? "text-brand-primary-stroke-strong"
                    : "text-gray-stroke-strong"
                }`}
              >
                {passwordsMatch ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Star className="h-3 w-3" />
                )}
                <span>Both passwords must match</span>
              </div>
            </div>
          )}
        </div>
        {showPasswordValidation && (
          <div className="space-y-1 text-xs">
            <div
              className={`flex items-center gap-2 ${
                minLength
                  ? "text-brand-primary-stroke-strong"
                  : "text-gray-stroke-strong"
              }`}
            >
              {minLength ? (
                <Check className="h-3 w-3" />
              ) : (
                <Star className="h-3 w-3" />
              )}
              <span>Must be at least 8 characters</span>
            </div>
            <div
              className={`flex items-center gap-2 ${
                uppercase
                  ? "text-brand-primary-stroke-strong"
                  : "text-gray-stroke-strong"
              }`}
            >
              {uppercase ? (
                <Check className="h-3 w-3" />
              ) : (
                <Star className="h-3 w-3" />
              )}
              <span>Must contain uppercase letter</span>
            </div>
            <div
              className={`flex items-center gap-2 ${
                lowercase
                  ? "text-brand-primary-stroke-strong"
                  : "text-gray-stroke-strong"
              }`}
            >
              {lowercase ? (
                <Check className="h-3 w-3" />
              ) : (
                <Star className="h-3 w-3" />
              )}
              <span>Must contain lowercase letter</span>
            </div>
            <div
              className={`flex items-center gap-2 ${
                number
                  ? "text-brand-primary-stroke-strong"
                  : "text-gray-stroke-strong"
              }`}
            >
              {number ? (
                <Check className="h-3 w-3" />
              ) : (
                <Star className="h-3 w-3" />
              )}
              <span>Must contain number</span>
            </div>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-brand-primary-text font-medium py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-90 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="h-6 w-6 animate-spin" />
              <span>Resetting Password...</span>
            </div>
          ) : (
            "Reset password"
          )}
        </Button>
      </form>
    </div>
  );
}
