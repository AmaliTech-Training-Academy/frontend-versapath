"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom-input";
import { useEffect, useRef, useState } from "react";
import {
  inviteUserSchema,
  type InviteUserInputs,
} from "@/lib/schemas/invite-user";
import { SheetClose } from "@/components/ui/sheet";
import { RadioGroupComponent } from "./radio-group";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { inviteUser } from "@/lib/api/users";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchRoles } from "@/lib/redux/slices/roles-slice";
import { useSWRConfig } from "swr";
export const InviteUserForm = () => {
  const { mutate } = useSWRConfig();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { isFetchingRoles, isFetchingError, roles } = useAppSelector(
    (state) => state.rolesReducer
  );
  const form = useForm<InviteUserInputs>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: "",
      role: "",
    },
    mode: "onChange",
  });
  const closeRef = useRef<HTMLButtonElement>(null);
  const onSubmit = async (data: InviteUserInputs) => {
    setError(null);
    const response = await inviteUser({
      email: data.email,
      roleId: data.role,
    });
    if (!response.success) {
      setError(response.message || "Failed to send invite. Please try again.");
    } else {
      toast.success(response.message, {
        action: {
          label: "Undo",
          onClick: () => {
            // Handle undo action logic when the endpoint is available from the backend
          },
        },
      });
      form.reset();
      mutate(
        (key) =>
          typeof key === "string" &&
          key.startsWith(`${process.env.NEXT_PUBLIC_API_URL}/users`)
      );
      closeRef.current?.click();
    }
  };
  useEffect(() => {
    if (roles.length === 0) {
      dispatch(fetchRoles());
    }
  }, [dispatch]);
  if (isFetchingRoles) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Loader className="animate-spin" size={30} />
      </div>
    );
  }
  if (isFetchingError || roles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        Failed to load roles. Please try again later.
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <CustomInput label="Email" type="email" {...field} />
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <RadioGroupComponent field={field} roles={roles} />
          )}
        />
        {error && <p className="mt-2 text-sm text-red-text">{error}</p>}
        <div className="flex justify-end space-x-3">
          <SheetClose asChild>
            <Button variant={"outline"} ref={closeRef}>
              Cancel
            </Button>
          </SheetClose>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader className=" animate-spin" />
            )}
            Send Invite
          </Button>
        </div>
      </form>
    </Form>
  );
};
