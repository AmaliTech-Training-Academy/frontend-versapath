"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema, type loginInputs } from "@/lib/schemas/login";
import {
  Form,
  FormField,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { mockApiLogin } from "@/lib/api/login";
import { CustomInput } from "@/components/custom/custom-input";

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<loginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: loginInputs) => {
    setError(null);
    const { email, password } = await loginSchema.parseAsync(data);
    const result = await mockApiLogin(email, password);

    if (result?.error) {
      setError(result.error);
    } else {
      toast.success("Login successful! Redirecting...");
      router.push('/dashboard');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[484px] w-full mx-auto rounded-lg p-6 sm:shadow-lg shadow-black/10 space-y-10"
      >
        <div className="space-y-2 text-center">
          <h5 className="text-[32px] font-semibold text-gray-text-strong/90">
            Login
          </h5>
          <p className="text-gray-text-weak/70">
            Login to access your dashboard
          </p>
        </div>

        <div className="space-y-6">
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <CustomInput
                label="Email"
                placeholder="Enter your email address"
                {...field}
              />
            )}
          />

          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <CustomInput
                label="Password"
                placeholder="Enter your password"
                type="password"
                {...field}
              />
            )}
          />

          {error && (
            <p className="text-sm tracking-normal text-red-text">{error}</p>
          )}

          <div className="flex justify-end">
            <Link href="#" className="text-sm text-brand-primary-text">
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="w-full px-6 rounded-lg cursor-pointer"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader className="animate-spin" /> Logging In...
              </>
            ) : (
              "Log In"
            )}
          </Button>
          <div className="flex justify-center space-x-1">
            <span className="text-sm font-medium tracking-normal text-gray-text-weak/70">
              Don't have an account?
            </span>
            <Link
              href="/register"
              className="text-sm font-medium tracking-normal text-brand-primary-text"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};
