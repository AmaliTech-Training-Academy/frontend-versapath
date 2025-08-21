'use client';

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { loginSchema, type loginInputs } from "@/lib/schemas/login";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff, Loader } from "lucide-react";
import { toast } from "sonner";

export const LoginForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const form = useForm<loginInputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange"
    });

    const onSubmit = async (data: loginInputs) => {
        setError(null);
        const result = await signIn("credentials", {
            ...data,
            redirect: false,
            callbackUrl: '/'
        });

        if(result?.error) {
            setError(result.error);
        } else {
            toast.success("Login successful! Redirecting...");
            router.push(result?.url || '/');
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-[484px] w-full mx-auto rounded-lg p-6 sm:shadow-lg shadow-black/10 space-y-10"
            >
                <FormDescription className="space-y-2 text-center">
                    <h5 className="text-[32px] font-semibold text-gray-text-strong/90">Login</h5>
                    <p className="text-gray-text-weak/70">
                        Login to access your dashboard
                    </p>
                </FormDescription>

                <div className="space-y-6">
                    {/* email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel className="font-semibold text-sm text-gray-text-strong/90">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full h-10 rounded-md border-gray-stroke-strong/30 py-2 px-3"
                                    />
                                </FormControl>
                                <FormMessage className="" />
                            </FormItem>
                        )}
                    />

                    {/* password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel className="font-semibold text-sm text-gray-text-strong/90">Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="w-full h-10 rounded-md border-gray-stroke-strong/30 py-2 px-3"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage className="" />
                            </FormItem>
                        )}
                    />

                    {
                        error && (
                            <p className="text-red-text text-sm tracking-normal">
                                {error}
                            </p>
                        )
                    }

                    <div className="flex justify-end">
                        <Link href="#" className="text-brand-primary-text text-sm">
                            Forgot Password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        disabled={form.formState.isSubmitting}
                        className="w-full rounded-lg px-6 cursor-pointer"
                    >
                        {
                            form.formState.isSubmitting ? <><Loader className="animate-spin" /> Logging In...</> : 'Log In'
                        }
                    </Button>
                    <div className="flex justify-center space-x-1">
                        <span className="font-medium text-sm tracking-normal text-gray-text-weak/70">
                            {`Don't have an account?`}
                        </span>
                        <Link href="#" className="text-brand-primary-text text-sm font-medium tracking-normal">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </form>
        </Form>
    );
}