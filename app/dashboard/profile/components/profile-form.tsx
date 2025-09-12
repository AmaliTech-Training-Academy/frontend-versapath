"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema, type ProfileSchema } from "@/lib/schemas/profile-form";
import {
    Form,
    FormField,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Camera, Loader } from "lucide-react";
import { toast } from "sonner";
import { CustomInput } from "@/components/custom/custom-input";
import { useSession } from "next-auth/react";
import Image from "next/image";
import user from "@/public/images/user-profile.jpg";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

export const ProfileForm = () => {
    const { data: session, status } = useSession();
    const inputId = "profile-image-input";

    const form = useForm<ProfileSchema>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: session?.user.firstName ?? "",
            lastName: session?.user.lastName ?? "",
            email: session?.user.email ?? "",
            image: undefined
        },
        mode: "onChange",
    });

    // When session loads/changes, hydrate the form with user data
    useEffect(() => {
        if (!session?.user) return;
        form.reset({
            firstName: session.user.firstName ?? "",
            lastName: session.user.lastName ?? "",
            email: session.user.email ?? "",
            phoneNumber: (session.user as any).phoneNumber ?? "",
            image: undefined, // file inputs can't be prefilled; keep undefined
        });
    }, [session?.user, form]);

    const onSubmit = async (data: ProfileSchema) => {
        setTimeout(() => console.log(data), 2000);
        toast.success('Profile updated successfully!');
    };

    if(status === "loading") {
        return (
            <div className="col-span-3 w-full min-h-1/2 flex items-center justify-center text-gray-stroke-strong">
                <Loader className="animate-spin" />
                <span>Loading...</span>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="col-span-3 w-full h-fit space-y-6"
            >
                <div className="flex items-center gap-6">
                    <div className="w-[150px] h-[150px] relative rounded-full">
                        <Image src={user} width={1880} height={1253} alt={`${session?.user.username} image`} className="w-full h-full object-cover rounded-full" priority />
                        {/* <Button className="w-[30px] h-[30px] absolute bottom-3 right-1 rounded-full bg-brand-primary-text flex items-center justify-center cursor-pointer">
                            <Camera className="text-base-white" size={24} />
                        </Button> */}
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field: { onChange, onBlur, name, ref } }) => (
                                <>
                                    <Input
                                        id={inputId}
                                        type="file"
                                        className="w-[30px] h-[30px] absolute bottom-3 right-1 rounded-full bg-brand-primary-text flex items-center justify-center cursor-pointer"
                                        accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                                        multiple={false}
                                        name={name}
                                        ref={ref}
                                        onBlur={onBlur}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            onChange(file ?? undefined);
                                        }}
                                    />
                                    <label
                                        htmlFor="profile-image-input"
                                        className="w-[30px] h-[30px] absolute bottom-3 right-1 rounded-full bg-brand-primary-text flex items-center justify-center cursor-pointer"
                                    >
                                        <Camera className="text-base-white" size={20} />
                                    </label></>

                            )}
                        />
                    </div>
                    {
                        form.formState.defaultValues?.image !== undefined && (
                            <Button>
                                Remove Photo
                            </Button>
                        )
                    }
                </div>

                <div className="space-y-6">
                    {/* First Name */}
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <CustomInput
                                label="First Name"
                                placeholder="Enter your first name"
                                {...field}
                            />
                        )}
                    />

                    {/* Last Name */}
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <CustomInput
                                label="Last Name"
                                placeholder="Enter your last name"
                                {...field}
                            />
                        )}
                    />

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

                    {/* email */}
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <CustomInput
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                {...field}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        size="lg"
                        disabled={!form.formState.isDirty || form.formState.isSubmitting}
                        className="px-6 rounded-lg cursor-pointer"
                    >
                        {
                            form.formState.isSubmitting ? (
                                <>
                                    <Loader className="animate-spin" /> Saving change(s)
                                </>
                            ) : (
                                "Save Change(s)"
                            )
                        }
                    </Button>
                </div>
            </form>
        </Form>
    );
};
