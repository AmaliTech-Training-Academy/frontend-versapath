"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom-input";
import { useRef, useState } from "react";
import { SheetClose } from "@/components/ui/sheet";
import { Loader } from "lucide-react";
import {
  type AddCategoryInputs,
  addCategorySchema,
} from "@/lib/schemas/add-category";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api/api-request";
import { Cluster, ItemData } from "@/lib/types/api";
import { extractErrorMessage } from "@/lib/utils";
import { CustomTextarea } from "@/components/custom/custom-text-area";

export const EditCategoryForm = ({
  cluster,
  revalidateAction,
}: {
  cluster: Cluster;
  revalidateAction: () => void;
}) => {
  const [error, setError] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const form = useForm<AddCategoryInputs>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: cluster.name,
      description: cluster.description ?? "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: AddCategoryInputs) => {
    setError(null);
    const res = await apiRequest<ItemData<Cluster>>(
      `/clusters/update?type=one&clusterId=${cluster.id}`,
      "PATCH",
      {
        name: data.name,
        description: data.description ?? "",
      }
    );

    if (!res.success) {
      setError(extractErrorMessage(res.errors as string[], res.message));
      return;
    }
    toast.success("Category updated successfully!");
    form.reset();
    revalidateAction();
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
            <CustomTextarea label="Description" {...field} />
          )}
        />
        {error && <p className="text-red-text text-sm mt-2">{error}</p>}
        <div className="flex justify-end space-x-3">
          <SheetClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </SheetClose>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="cursor-pointer"
          >
            {form.formState.isSubmitting && <Loader className="animate-spin" />}
            Save Changes
          </Button>
        </div>

        <SheetClose ref={closeRef} className="hidden" />
      </form>
    </Form>
  );
};
