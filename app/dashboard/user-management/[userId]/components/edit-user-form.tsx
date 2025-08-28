"use client";
import { Form, FormField } from "@/components/ui/form";
import { CustomInput } from "@/components/custom/custom-input";
import { EditUserImage } from "./edit-user-image";
import { useForm } from "react-hook-form";
import { CustomSelect } from "@/components/custom/custom-select";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
export const EditUserForm = () => {
  const form = useForm();
  const onSubmit = async () => {
    // Handle login logic here}
  };
  return (
    <section className="w-full px-2 pb-5 space-y-4">
      <EditUserImage />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name=""
            render={({ field }) => (
              <CustomInput
                label="Full Name"
                placeholder="Mary Mensah"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name=""
            render={({ field }) => (
              <CustomSelect
                label="Role"
                selectValues={["Learner", "Mentor", "Manager", "Admin"]}
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name=""
            render={({ field }) => (
              <CustomInput
                label="Email"
                placeholder="mary.mensah@gmail.com"
                type="text"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name=""
            render={({ field }) => (
              <CustomInput
                label="Phone number"
                placeholder="0786 123 456"
                type="text"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name=""
            render={({ field }) => (
              <CustomInput
                label="Date joined"
                type="date"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name=""
            render={({ field }) => (
              <CustomSelect
                label="Assigned Mentor"
                selectValues={["Mentor1", "Mentor2", "Mentor3", "Mentor4"]}
                {...field}
              />
            )}
          />

          <FormField
            control={form.control}
            name=""
            render={({ field }) => (
              <CustomSelect
                label="Manager"
                selectValues={["Manager1", "Manager2", "Manager3", "Manager4"]}
                {...field}
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
