"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormDescription,
  FormField,

} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";
import { CustomInput } from "@/components/custom/custom-input";
import { RegisterInputs, registerSchema } from "@/lib/schemas/register";

export const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const form = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      fullName: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterInputs) => {
    // Handle login logic here
    // form.reset();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Login successful");

    form.setError("root", {
      type: "manual",
      message: "Unable to register, please try again. ",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[484px] w-full mx-auto rounded-lg p-6 sm:shadow-lg shadow-black/10 space-y-10"
      >
        <FormDescription className="space-y-2 text-center">
          <h5 className="text-[32px] font-semibold text-gray-text-strong/90">
            Sign up
          </h5>
          <p className="text-gray-text-weak/70">
            Sign up to access your dashboard
          </p>
        </FormDescription>

        <div className="space-y-6">
          {/* email */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <CustomInput label="Email" placeholder="Full Name" {...field} />
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
