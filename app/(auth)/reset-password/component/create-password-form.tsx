"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader, Check, Star } from "lucide-react";
import { createPasswordSchema } from "@/lib/schemas/new-password";
import type { CreatePasswordForm } from "@/lib/schemas/new-password";
import { useRouter, useSearchParams } from "next/navigation";
import { authApi } from "@/lib/api/reset-password";
import { PasswordResetSuccess } from "./successs-message";

export default function CreatePasswordForm() {
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreatePasswordForm>({
    resolver: zodResolver(createPasswordSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const resetToken = searchParams.get("reset");
    if (!resetToken) router.push("/login");
  }, [searchParams, router]);

  const onSubmit = async (data: CreatePasswordForm) => {
    const resetToken = searchParams.get("reset") ?? "";
    const { confirmPassword, password } = data;
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await authApi.updatePassword(resetToken, {
        confirmPassword,
        password,
      });
      setSuccessMessage(response?.message || "Password reset successful.");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to reset password. Please try again."
      );
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

      {errorMessage && (
        <div className="mb-4 text-red-600 text-sm text-center">
          {errorMessage}
        </div>
      )}

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
          {watch("confirmPassword") && watch("confirmPassword").length > 0 && (
            <div className="text-xs">
              <div
                className={`flex items-center gap-2 ${
                  watch("password") &&
                  watch("confirmPassword") &&
                  watch("password") === watch("confirmPassword")
                    ? "text-brand-primary-stroke-strong"
                    : "text-gray-stroke-strong"
                }`}
              >
                {watch("password") &&
                watch("confirmPassword") &&
                watch("password") === watch("confirmPassword") ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Star className="h-3 w-3" />
                )}
                <span>Both passwords must match</span>
              </div>
            </div>
          )}
          {errors.confirmPassword && (
            <p className="text-xs text-red-text">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {watch("password") && watch("password").length > 0 && (
          <div className="space-y-1 text-xs">
            <div
              className={`flex items-center gap-2 ${
                watch("password").length >= 8
                  ? "text-brand-primary-stroke-strong"
                  : "text-gray-stroke-strong"
              }`}
            >
              {watch("password").length >= 8 ? (
                <Check className="h-3 w-3" />
              ) : (
                <Star className="h-3 w-3" />
              )}
              <span>Must be at least 8 characters</span>
            </div>
            <div
              className={`flex items-center gap-2 ${
                /[A-Z]/.test(watch("password"))
                  ? "text-brand-primary-stroke-strong"
                  : "text-gray-stroke-strong"
              }`}
            >
              {/[A-Z]/.test(watch("password")) ? (
                <Check className="h-3 w-3" />
              ) : (
                <Star className="h-3 w-3" />
              )}
              <span>Must contain uppercase letter</span>
            </div>
            <div
              className={`flex items-center gap-2 ${
                /[a-z]/.test(watch("password"))
                  ? "text-brand-primary-stroke-strong"
                  : "text-gray-stroke-strong"
              }`}
            >
              {/[a-z]/.test(watch("password")) ? (
                <Check className="h-3 w-3" />
              ) : (
                <Star className="h-3 w-3" />
              )}
              <span>Must contain lowercase letter</span>
            </div>
            <div
              className={`flex items-center gap-2 ${
                /[0-9]/.test(watch("password"))
                  ? "text-brand-primary-stroke-strong"
                  : "text-gray-stroke-strong"
              }`}
            >
              {/[0-9]/.test(watch("password")) ? (
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
