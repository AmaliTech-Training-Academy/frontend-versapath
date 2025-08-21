"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom-input";
import { useState } from "react";
import {
  inviteUserSchema,
  type InviteUserInputs,
} from "@/lib/schemas/invite-user";
import { SheetClose } from "@/components/ui/sheet";
import { RadioGroupComponent } from "./radio-group";
import { Loader } from "lucide-react";

export const InviteUserForm = () => {
  const [error, setError] = useState<string | null>(null);
  const form = useForm<InviteUserInputs>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: "",
      role: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: InviteUserInputs) => {
    // Handle login logic here
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Login successful");
    console.log(data);
    setError("Email and password don't match, try again");
  };
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
          render={({ field }) => <RadioGroupComponent field={field} />}
        />
        {error && <p className="text-red-text text-sm mt-2">{error}</p>}
        <div className="flex justify-end space-x-3">
          <SheetClose asChild>
            <Button variant={"outline"}>Cancel</Button>
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
