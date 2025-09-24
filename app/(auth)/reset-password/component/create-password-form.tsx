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
import { toast } from "sonner";
import { useState, useEffect } from "react";

export const CreateNewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

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
      if (response.success) {
        toast.success(
          response.data?.message ||
            "Password was reset successfully. Redirecting to login..."
        );
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setErrorMessage(
          (response as { message?: string })?.message ||
            "Password reset failed."
        );
      }
    } catch (error) {
      setErrorMessage("Failed to reset password. Please try again.");
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        data-testid="create-new-password-form"
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

        {errorMessage && (
          <p className="text-sm text-destructive text-center">{errorMessage}</p>
        )}
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
