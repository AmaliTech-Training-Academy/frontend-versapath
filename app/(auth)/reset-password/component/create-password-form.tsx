
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import { PasswordInput } from "./password-input";
import {
  createPasswordSchema,
  type CreatePasswordForm,
} from "@/lib/schemas/new-password";
import { authApi } from "@/lib/api/reset-password";
import { PasswordResetSuccess } from "./successs-message";
import { useState, useEffect } from "react";

export const CreateNewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<CreatePasswordForm>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const resetToken = searchParams.get("reset");
    if (!resetToken) router.push("/login");
  }, [searchParams, router]);

  const onSubmit = async (data: CreatePasswordForm) => {
    setErrorMessage("");
    const resetToken = searchParams.get("reset") ?? "";

    try {
      const response = await authApi.updatePassword(resetToken, data);
      if ((response as { success?: boolean })?.success) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setErrorMessage((response as { message?: string })?.message || "Password reset failed.");
      }
    } catch (error) {
      setErrorMessage("Failed to reset password. Please try again.");
      console.error(error);
    }
  };

  if (success) {
    return <PasswordResetSuccess />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-text mb-2">
            Create new password
          </h1>
          <p className="text-sm text-gray-text-weak">
            Your new password must be different from previously used ones.
          </p>
        </div>

        {errorMessage && (
          <p className="text-sm text-red-600 text-center">{errorMessage}</p>
        )}

        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full py-3 rounded-md"
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader className="h-5 w-5 animate-spin" />
              <span>Resetting Password...</span>
            </div>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </Form>
  );
};
