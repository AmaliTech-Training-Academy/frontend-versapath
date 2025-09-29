"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom-input";
import { useEffect, useRef } from "react";
import {
  inviteUserSchema,
  type InviteUserInputs,
} from "@/lib/schemas/invite-user";
import { SheetClose } from "@/components/ui/sheet";
import { RadioGroupComponent } from "./radio-group";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchRoles } from "@/lib/redux/slices/roles-slice";
import { useSWRConfig } from "swr";
import { apiRequest } from "@/lib/api/api-request";
import { User } from "@/lib/types/api";
import { MultipleSelectChip } from "@/components/custom/multiple-selection-input";
import { fetchSpecializations } from "@/lib/redux/slices/specialization-slice";
export const InviteUserForm = () => {
  const { mutate } = useSWRConfig();
  const dispatch = useAppDispatch();
  const { isFetchingRoles, isFetchingError, roles } = useAppSelector(
    (state) => state.rolesReducer
  );
  const {
    specializations,
    isFetchingError: isFetchingSpecError,
    isFetching: isFetchingSpecs,
  } = useAppSelector((state) => state.specializationReducer);
  const form = useForm<InviteUserInputs>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: "",
      role: "",
    },
    mode: "onChange",
  });
  const closeRef = useRef<HTMLButtonElement>(null);
  const isMentorSelected = useWatch({
    control: form.control,
    name: "role",
    compute: (role) => roles.find((r) => r.id === role)?.role === "MENTOR",
  });
  const onSubmit = async (data: InviteUserInputs) => {
    if (
      isMentorSelected &&
      (!data.specialization || data.specialization.length === 0)
    ) {
      form.setError("specialization", {
        type: "manual",
        message: "Please select at least one specialization.",
      });
      return;
    }
    const specializationIds = specializations
      .map((spec) =>
        data.specialization?.includes(spec.specName) ? spec.specId : null
      )
      .filter((id) => !!id);
    const response = await apiRequest<User>("/register/invite-user", "POST", {
      email: data.email,
      roleId: data.role,
      specializationIds,
    });
    if (!response.success) {
      form.setError("root", {
        type: "manual",
        message: response.message || "Failed to send invite. Please try again.",
      });
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
      mutate((key) => typeof key === "string" && key.startsWith(`/users`));
      closeRef.current?.click();
    }
  };
  useEffect(() => {
    if (form.formState.errors.specialization && !isMentorSelected) {
      form.clearErrors("specialization");
    }
  }, [isMentorSelected, form]);
  useEffect(() => {
    if (roles.length === 0 || specializations.length === 0) {
      dispatch(fetchRoles());
      dispatch(fetchSpecializations());
    }
  }, [dispatch, roles.length, specializations.length]);
  if (isFetchingRoles || isFetchingSpecs) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Loader className="animate-spin" size={30} />
      </div>
    );
  }
  if (isFetchingError || roles.length === 0 || isFetchingSpecError) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        {isFetchingError && "  Failed to load roles. Please try again later."}
        {isFetchingSpecError &&
          " Failed to load specializations. Please try again later."}
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <MultipleSelectChip
              defaultTags={specializations.map((spec) => spec.specName)}
              value={field.value || []}
              onChange={field.onChange}
              label="Mentor Specializations"
              placeholder="Select Specializations"
              disabled={!isMentorSelected}
            />
          )}
        />
        {form.formState.errors.root && (
          <p className="mt-2 text-sm text-red-text">
            {form.formState.errors.root.message}
          </p>
        )}
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
