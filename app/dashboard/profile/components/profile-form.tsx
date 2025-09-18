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
import userPlaceholder from "@/public/images/user-placeholder.png";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { apiRequest } from "@/lib/api/api-request";
import { User } from "@/lib/types/api";
import { extractErrorMessage } from "@/lib/utils";

type ProfilePayload = {
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
};

export const ProfileForm = () => {
    const { data: session, status, update } = useSession();
    const inputId = "profile-image-input";

    const form = useForm<ProfileSchema>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            userName: "",
            phoneNumber: "",
            image: undefined
        },
        mode: "onChange",
    });

    // When session loads/changes, hydrate the form with user data
    useEffect(() => {
        const user = session?.user;
        if (!user) return;
        form.reset({
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            userName: user.username ?? "",
            phoneNumber: user.phoneNumber ?? "",
            image: undefined
        });
    }, [session?.user, form]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [removed, setRemoved] = useState(false);
    const selected = form.watch("image");

    // create/cleanup object URL when a File is selected
    useEffect(() => {
        if (selected instanceof File) {
            setRemoved(false);
            const url = URL.createObjectURL(selected);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
        setPreviewUrl(null);
    }, [selected]);

    const existingUrl = typeof session?.user?.image === "string" ? session.user.image : undefined;
    // decide image src: file preview → session url → placeholder
    const imageSrc = previewUrl || (!removed && existingUrl) || userPlaceholder;

    const clearFileSelection = () => {
        form.setValue("image", undefined, { shouldDirty: true, shouldTouch: true });
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const onSubmit = async (data: ProfileSchema) => {
        const { firstName, lastName, userName, phoneNumber } = await profileFormSchema.parseAsync(data);

        const formData = new FormData();
        const profileData = {
            firstName,
            lastName,
            username: userName,
            phoneNumber
        };

        formData.append('profile', new Blob([JSON.stringify(profileData)], { type: 'application/json' }));

        if (selected instanceof File) {
            formData.append('profilePicture', selected);
        }

        const result = await apiRequest<User>('/users/profile', 'PATCH', formData);

        if (!result.success) {
            toast.error(extractErrorMessage(result.errors as string[], result.message));
            return;
        }

        const updated = result.data;
        // Push the fresh fields into the NextAuth session (token → session)
        await update({
            user: {
                // merge only what changed
                ...session?.user,
                firstName: updated?.firstName ?? session?.user.firstName,
                lastName: updated?.lastName ?? session?.user.lastName,
                username: updated?.username ?? session?.user.username,
                phoneNumber: updated?.phoneNumber ?? session?.user.phoneNumber,
                image: updated?.profilePictureUrl ?? session?.user.image
            },
        });

        toast.success("Profile updated successfully");
        setRemoved(false);
        // keep text fields, clear image selection
        form.reset({ ...data, image: undefined });
        clearFileSelection();
    };

    const removePhoto = async () => {
        // If a file is selected, clear it; otherwise mark the existing URL as removed (UI shows placeholder)
        if (selected instanceof File) {
            clearFileSelection();
            return;
        }
        if (!existingUrl) return;

        // Otherwise, remove the existing profile picture on the backend
        const result = await apiRequest<User>('/users/profile-picture', 'PATCH');
        if (!result.success) {
            toast.error(extractErrorMessage(result.errors as string[], result.message));
            return;
        }

        await update({ user: { ...session?.user, image: undefined }});
        setRemoved(true);
        toast.success(result.message || "Profile updated successfully");
        form.trigger();
    };

    if (status === "loading") {
        return (
            <div className="col-span-3 w-full min-h-1/2 flex items-center justify-center text-gray-stroke-strong">
                <Loader className="animate-spin" />
                <span>Loading...</span>
            </div>
        )
    }

    const canRemove = selected instanceof File || (!!existingUrl && !removed);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="col-span-3 w-full h-fit space-y-6"
            >
                {/* The change profile image functionality is not yet implemented on the backend */}
                <div className="flex items-center gap-6">
                    <div className="w-[150px] h-[150px] relative rounded-full">
                        <Image src={imageSrc} width={1880} height={1253} alt={`${session?.user.username} image`} className="w-full h-full object-cover rounded-[999px]" priority />
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
                                    </label>
                                </>

                            )}
                        />
                    </div>
                    {
                        canRemove && (
                            <Button
                                type="button"
                                onClick={removePhoto}
                            >
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

                    {/* Username */}
                    <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                            <CustomInput
                                label="Username"
                                placeholder="Enter your username"
                                {...field}
                            />
                        )}
                    />

                    {/* Phone number */}
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
