"use client";
import { Form, FormField } from "@/components/ui/form";
import { CustomInput } from "@/components/custom/custom-input";
import { EditUserImage } from "./edit-user-image";
import { useForm } from "react-hook-form";
import { CustomSelect } from "@/components/custom/custom-select";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { User } from "@/lib/types/api";
import { UpdateUserProps, updateUserSchema } from "@/lib/schemas/update-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Roles } from "@/lib/types";
import { toast } from "sonner";

export const EditUserForm: React.FC<{ initialData: User }> = ({
  initialData,
}) => {
  const form = useForm<UpdateUserProps>({
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
    defaultValues: {
      fullName: `${initialData.firstName || ""} ${
        initialData.lastName || ""
      }`.trim(),
      username: initialData.username || "",
      role: initialData.role || "",
      email: initialData.email || "",
      status: initialData.status || "",
      phoneNumber: "",
      mentor: "",
      manager: "",
    },
  });
  const onSubmit = async () => {
    toast.warning("Implementation not done yet. Please be patient");
  };
  return (
    <section className="w-full px-2 pb-5 space-y-4">
      <EditUserImage />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <CustomInput
                label="Full Name"
                placeholder="e.g: Mary Mensah"
                {...field}
                value={field.value || ""}
              />
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <CustomInput
                label="Username"
                placeholder="e.g: marymensah01"
                {...field}
                value={field.value || ""}
              />
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <CustomSelect
                label="Role"
                placeholder="Select role"
                selectValues={Object.values(Roles)}
                {...field}
                value={field.value || ""}
                disabled
              />
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <CustomSelect
                label="Status"
                placeholder="Select status"
                selectValues={["ACTIVE", "INACTIVE"]}
                {...field}
                value={field.value || ""}
                disabled
              />
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <CustomInput
                label="Email"
                placeholder="email@mail.com"
                type="text"
                {...field}
                value={field.value || ""}
                disabled
              />
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <CustomInput
                label="Phone number"
                placeholder="0786 123 456"
                type="text"
                {...field}
                value={field.value || ""}
              />
            )}
          />
          <FormField
            control={form.control}
            name="mentor"
            render={({ field }) => (
              <CustomSelect
                label="Assigned Mentor"
                placeholder="Assign a mentor"
                selectValues={["Mentor1", "Mentor2", "Mentor3", "Mentor4"]}
                {...field}
                value={field.value || ""}
              />
            )}
          />
          <FormField
            control={form.control}
            name="manager"
            render={({ field }) => (
              <CustomSelect
                label="Manager"
                placeholder="Assign a manager"
                selectValues={["Manager1", "Manager2", "Manager3", "Manager4"]}
                {...field}
                value={field.value || ""}
              />
            )}
          />
          <div className="flex justify-end space-x-3">
            <SheetClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </SheetClose>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader className=" animate-spin" />
              )}
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
