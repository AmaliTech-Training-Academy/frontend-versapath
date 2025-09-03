"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom-input";
import { useRef, useState } from "react";
import { SheetClose } from "@/components/ui/sheet";
import { Loader } from "lucide-react";
import { type AddCategoryInputs, addCategorySchema } from "@/lib/schemas/add-category";
import { FileUpload } from "@/components/custom/file-upload";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api/api-request";
import { Cluster, ItemData } from "@/lib/types/api";
import { useClusters } from "@/lib/hooks/use-clusters";
import { extractErrorMessage } from "@/lib/utils";

export const AddCategoryForm = () => {
  const [error, setError] = useState<string | null>(null);
  const { refetch } = useClusters();
  const form = useForm<AddCategoryInputs>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
    },
    mode: "onChange",
  });

  // Ref to programmatically close the sheet
  const closeRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (data: AddCategoryInputs) => {
    setError(null);
    const res = await apiRequest<ItemData<Cluster>>('/clusters', 'POST', data);

    if (!res.success) {
      setError(extractErrorMessage(res.errors as string[], res.message));
      return;
    }
    toast.success("Skill category added successfully!");
    form.reset();
    refetch();
    closeRef.current?.click();
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
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FileUpload label="Cover" value={field.value} onChangeAction={field.onChange} />
          )}
        />
        {error && <p className="text-red-text text-sm mt-2">{error}</p>}
        <div className="flex justify-end space-x-3">
          <SheetClose asChild>
            <Button variant={"outline"} className="cursor-pointer">Cancel</Button>
          </SheetClose>
          <Button type="submit" disabled={form.formState.isSubmitting} className="cursor-pointer">
            {form.formState.isSubmitting && (
              <Loader className=" animate-spin" />
            )}
            Add Category
          </Button>
        </div>

        {/* To trigger programmatically on success */}
        <SheetClose ref={closeRef} className="hidden" />
      </form>
    </Form>
  );
};