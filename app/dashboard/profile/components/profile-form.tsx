"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema, type ProfileSchema } from "@/lib/schemas/profile-form";
import {
    Form,
    FormField,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Camera, Loader } from "lucide-react";
import { toast } from "sonner";
import { CustomInput } from "@/components/custom/custom-input";
import { useSession } from "next-auth/react";
import Image from "next/image";
import user from "@/public/images/user-profile.jpg";

export const ProfileForm = () => {
    const { data: session } = useSession()
    const [error, setError] = useState<string | null>(null);
    const form = useForm<ProfileSchema>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: session?.user.email ?? "",
            phoneNumber: "",
            image: undefined
        },
        mode: "onChange",
    });

    const onSubmit = async (data: ProfileSchema) => {
        setError(null);
        setTimeout(() => console.log(data), 2000);
        toast.success('Profile updated successfully!');
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="col-span-2 w-full h-fit space-y-6"
            >
                <div className="flex items-center gap-6">
                    <div className="w-[150px] h-[150px] relative rounded-full">
                        <Image src={user} width={1880} height={1253} alt={`${session?.user.username} image`} className="w-full h-full object-cover rounded-full" />
                        <Camera />
                    </div>
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
                </div>
            </form>
        </Form>
    );
};
