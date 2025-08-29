"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom-input";
import { useState } from "react";
import { SheetClose } from "@/components/ui/sheet";
import { Loader } from "lucide-react";
import { type AddCategoryInputs, addCategorySchema } from "@/lib/schemas/add-category";

export const AddCategoryForm = () => {
  const [error, setError] = useState<string | null>(null);
  const form = useForm<AddCategoryInputs>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      cover: undefined,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: AddCategoryInputs) => {
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Category added successfully");
    console.log(data);
    setError("Failed to add category, try again");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <CustomInput label="Category Name *" type="text" {...field} />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <CustomInput label="Description" type="text" {...field} />
          )}
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
            Add Category
          </Button>
        </div>
      </form>
    </Form>
  );
};