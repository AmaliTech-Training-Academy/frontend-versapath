"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";
import { CustomInput } from "@/components/custom/custom-input";
import { RegisterInputs, registerSchema } from "@/lib/schemas/register";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { completeUserRegister } from "@/lib/api/users";
import { toast } from "sonner";

export const RegisterForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    const inviteToken = searchParams.get("invite");
    const email = searchParams.get("email");
    if (inviteToken && email) {
      form.setValue("email", decodeURIComponent(email));
    } else router.push("/login");
    //eslint-disable-next-line
  }, [searchParams]);

  const form = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async ({
    password,
    confirmPassword,
    username,
    fullName,
  }: RegisterInputs) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const inviteToken = searchParams.get("invite") ?? "";
    const registerResponse = await completeUserRegister(inviteToken, {
      firstName: fullName.split(" ")[0],
      lastName: fullName.split(" ").slice(1).join(" "),
      password,
      confirmPassword,
      username,
    });
    if (!registerResponse.success) {
      form.setError("root", {
        type: "manual",
        message: registerResponse.errors?.[0] || registerResponse.message,
      });
      return;
    }
    toast.success(registerResponse.message || "Registration successful!");
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[484px] w-full mx-auto rounded-lg p-6 sm:shadow-lg shadow-black/10 space-y-10 "
      >
        <div className="space-y-2 text-center">
          <h5 className="text-[32px] font-semibold text-gray-text-strong/90">
            Complete Registration
          </h5>
          <p className="text-gray-text-weak/70">
            Complete your registration to access your dashboard
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
                disabled
                className="cursor-not-allowed bg-gray-stroke-weak"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <CustomInput
                label="Username"
                placeholder="Enter unique username"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <CustomInput
                label="Full name"
                placeholder="Enter both names"
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
          {/*Confirm  Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <CustomInput
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                {...field}
              />
            )}
          />

          {form.formState.errors.root && (
            <p className="text-sm tracking-normal text-red-text">
              {form.formState.errors.root.message}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="w-full px-6 rounded-lg cursor-pointer"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader className="animate-spin" />
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <div className="flex justify-center space-x-1">
            <span className="text-sm font-medium tracking-normal text-gray-text-weak/70">
              Arleady have an account?
            </span>
            <Link
              href="/login"
              className="text-sm font-medium tracking-normal text-brand-primary-text"
            >
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};
