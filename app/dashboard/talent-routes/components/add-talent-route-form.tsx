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
import { extractErrorMessage } from "@/lib/utils";
import {
  type AddTalentRouteProps,
  addTalentRouteSchema,
} from "@/lib/schemas/add-talent-route";
import {
  addTalentRoute,
  revalidateAllTalentRoutes,
  searchRoute,
} from "@/lib/api/talent-route";
import { MultipleSelectChip } from "@/components/custom/multiple-selection-input";
import { CustomTextarea } from "@/components/custom/custom-text-area";
import { useGrowthTracks } from "@/lib/api/growth-track";

export const AddTalentRouteForm = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { items: tracksItems } = useGrowthTracks();
  const form = useForm<AddTalentRouteProps>({
    resolver: zodResolver(addTalentRouteSchema),
    defaultValues: {
      name: "",
      roleName: "",
      description: "",
      image: undefined,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: AddTalentRouteProps) => {
    const ids = tracksItems
      .map((item) => (data.trackIds?.includes(item.name) ? item.id : null))
      .filter((val) => val !== null);
    const res = await addTalentRoute({ ...data, trackIds: ids });

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
              label="Route Name *"
              type="text"
              {...field}
              placeholder="e.g: UI/UX design"
            />
          )}
        />
        <FormField
          control={form.control}
          name="roleName"
          render={({ field }) => (
            <CustomInput
              label="Role Name *"
              type="text"
              {...field}
              placeholder="e.g: UI/UX Designer"
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
          name="trackIds"
          render={({ field }) => (
            <FormItem>
              <MultipleSelectChip
                defaultTags={tracksItems.map((item) => item.name)}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select growth tracks"
                label="Growth Tracks *"
                addNewAllowed={false}
                onSearch={async (query) => searchRoute(query)}
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
          <p className="mt-2 text-sm text-red-text">
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
            Add Talent route
          </Button>
        </div>

        <SheetClose ref={closeRef} className="hidden" />
      </form>
    </Form>
  );
};
