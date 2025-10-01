"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom-input";
import { useRef } from "react";
import { SheetClose } from "@/components/ui/sheet";
import { Loader } from "lucide-react";
import { FileUpload } from "@/components/custom/file-upload";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api/api-request";
import { ItemData } from "@/lib/types/api";
import { extractErrorMessage } from "@/lib/utils";
import { toFormData } from "@/lib/hooks/to-form-data";
import { revalidateAllTalentRoutes } from "@/lib/api/talent-route";
import {
  AddGrowthTracksProps,
  addGrowthTracksSchema,
} from "@/lib/schemas/add-growth-track";
import { GrowthTrack } from "@/lib/types/growth-track";
import { MultipleSelectChip } from "@/components/custom/multiple-selection-input";
import { CustomTextarea } from "@/components/custom/custom-text-area";

export const AddGrowthTrackForm = () => {
  const closeRef = useRef<HTMLButtonElement>(null);

  const form = useForm<AddGrowthTracksProps>({
    resolver: zodResolver(addGrowthTracksSchema),
    defaultValues: {
      name: "",
      estimatedMonths: 1,
      description: "",
      image: undefined,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: AddGrowthTracksProps) => {
    const formData = toFormData({
      name: data.name,
      estimatedMonths: data.estimatedMonths,
      description: data.description ?? "",
      image: data.image,
    });

    const res = await apiRequest<ItemData<GrowthTrack>>(
      "/talent-routes",
      "POST",
      formData
    );

    if (!res.success) {
      form.setError("root", {
        type: "manual",
        message: extractErrorMessage(res.errors as string[], res.message),
      });
      return;
    }
    toast.success("Talent route added successfully!");
    form.reset();
    revalidateAllTalentRoutes();
    closeRef.current?.click();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <CustomInput
              label="Track Name *"
              type="text"
              {...field}
              placeholder="e.g: UI/UX design"
            />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <CustomTextarea label="Description" {...field} />
          )}
        />
        <FormField
          control={form.control}
          name="estimatedMonths"
          render={({ field }) => (
            <CustomInput
              label="Estimated Months"
              type="number"
              min={1}
              max={36}
              {...field}
              value={field.value?.toString() || ""}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === "" ? 0 : parseFloat(value) || 0);
              }}
            />
          )}
        />
        <FormField
          control={form.control}
          name="capsuleIds"
          render={({ field }) => (
            <FormItem>
              <MultipleSelectChip
                defaultTags={[]}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select Skills"
                label="Skills *"
                addNewAllowed={false}
                // onSearch={searchCategoriesForComponent}
                searchPlaceholder="Search categories..."
                // onNewInput={setNewCategoriesIds}
              />
              <FormMessage className="-mt-1 text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUpload
                  label="Cover"
                  value={field.value}
                  onChangeAction={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <p className="text-red-text text-sm mt-2">
            {form.formState.errors.root.message}
          </p>
        )}
        <div className="flex justify-end space-x-3">
          <SheetClose asChild>
            <Button variant={"outline"} className="cursor-pointer">
              Cancel
            </Button>
          </SheetClose>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="cursor-pointer"
          >
            {form.formState.isSubmitting && (
              <Loader className=" animate-spin" />
            )}
            Add Growth track
          </Button>
        </div>

        <SheetClose ref={closeRef} className="hidden" />
      </form>
    </Form>
  );
};
