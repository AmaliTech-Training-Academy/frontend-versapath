"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authApi, ApiError } from "@/lib/api/reset-password";
import { resetPasswordSchema } from "@/lib/schemas/reset-passord";


type ResetPasswordFormData = {
  email: string;
};

export function ResetPasswordForm() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setApiError("");
      setSuccessMessage("");

      const response = await authApi.resetPassword(data.email);
      setSuccessMessage(response.message);

      setTimeout(() => {
        router.push("/email-verification");
      }, 2000);
    } catch (error) {
      if (error instanceof ApiError) {
        setApiError(error.message);
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-xl border-0">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-[32px] font-semibold text-text-strong">
              Reset Password
            </h1>
            <p className="text-sm text-gray-text-weak">
              Enter the email address associated with your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2 text-left">
              <label
                htmlFor="email"
                className="text-gray-text-strong text-sm font-semibold"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                {...register("email")}
                className={`w-full px-3 py-2 rounded-md focus:border-2 focus:border-brand-primary-stroke-strong  ${
                  errors.email
                    ? "border-2 border-red-text focus:red-text"
                    : "border border-stroke-strong"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-text">{errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-brand-primary-text font-medium py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-90 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center text-md gap-2">
                  <Loader className="animate-spin h-6 w-6" />
                  <span>Sending Instructions</span>
                </div>
              ) : (
                "Send Instructions"
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
