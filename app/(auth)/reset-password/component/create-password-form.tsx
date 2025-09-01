"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader, Check, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { authApi, ApiError } from "@/lib/api/reset-password";

const createPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, "Must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().nonempty({ message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Both passwords must match",
    path: ["confirmPassword"],
  });

type CreatePasswordForm = z.infer<typeof createPasswordSchema>;

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

  const hasMinLength = password?.length >= 8;
  const hasUppercase = /[A-Z]/.test(password || "");
  const hasLowercase = /[a-z]/.test(password || "");
  const hasNumber = /[0-9]/.test(password || "");
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
      if (error instanceof ApiError) {
        setApiError(error.message);
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    }
  };
  if (successMessage) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border p-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-white" />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">
              Password reset completed
            </h2>
            <p className="text-sm text-gray-600">
              Your password has been successfully updated. You can now log in
              with your new password.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              onClick={() => router.push("/login")}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-md font-medium transition-colors"
            >
              Login
            </Button>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-2.5 rounded-md font-medium transition-colors"
            >
              Exit
            </Button>
          </div>
        </div>
      </div>
    );
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
          {errors.confirmPassword && (
            <p className="text-xs text-red-text">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {showPasswordValidation && (
          <div className="space-y-1 text-xs">
            <div
              className={`flex items-center gap-2 ${
                hasMinLength
                  ? "text-brand-primary-stroke-strong"
                  : "text-gray-stroke-strong"
              }`}
            >
              {hasMinLength ? (
                <Check className="h-3 w-3" />
              ) : (
                <Star className="h-3 w-3" />
              )}
              <span>Must be at least 8 characters</span>
            </div>
            <div
              className={`flex items-center gap-2 ${
                hasUppercase
                  ? "text-brand-primary-stroke-strong"
                  : "text-gray-stroke-strong"
              }`}
            >
              {hasUppercase ? (
                <Check className="h-3 w-3" />
              ) : (
                <Star className="h-3 w-3" />
              )}
              <span>Must contain uppercase letter</span>
            </div>
            <div
              className={`flex items-center gap-2 ${
                hasLowercase
                  ? "text-brand-primary-stroke-strong"
                  : "text-gray-stroke-strong"
              }`}
            >
              {hasLowercase ? (
                <Check className="h-3 w-3" />
              ) : (
                <Star className="h-3 w-3" />
              )}
              <span>Must contain lowercase letter</span>
            </div>
            <div
              className={`flex items-center gap-2 ${
                hasNumber
                  ? "text-brand-primary-stroke-strong"
                  : "text-gray-stroke-strong"
              }`}
            >
              {hasNumber ? (
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
