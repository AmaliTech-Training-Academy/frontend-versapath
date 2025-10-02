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
  AddGrowthTracksProps,
  addGrowthTracksSchema,
} from "@/lib/schemas/add-growth-track";
import { MultipleSelectChip } from "@/components/custom/multiple-selection-input";
import { CustomTextarea } from "@/components/custom/custom-text-area";
import {
  addGrowthTrack,
  revalidateAllGrowthTracks,
  searchGrowthTracks,
} from "@/lib/api/growth-track";
import { useFetchSkills } from "@/lib/api/skills";

export const AddGrowthTrackForm = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { skills } = useFetchSkills();
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
    const ids = skills?.data?.items
      .map((item) => (data.capsuleIds?.includes(item.name) ? item.id : null))
      .filter((val) => val !== null);
    const res = await addGrowthTrack({ ...data, capsuleIds: ids });

    if (!res.success) {
      form.setError("root", {
        type: "manual",
        message: extractErrorMessage(res.errors as string[], res.message),
      });
      return;
    }
    toast.success("Growth track added successfully!");
    form.reset();
    revalidateAllGrowthTracks();
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
              label="Growth Track Name *"
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
                defaultTags={skills?.data?.items.map((val) => val.name) || []}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select Skills"
                label="Skills *"
                addNewAllowed={false}
                onSearch={async (query) => searchGrowthTracks(query)}
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
            Add Growth track
          </Button>
        </div>

        <SheetClose ref={closeRef} className="hidden" />
      </form>
    </Form>
  );
};
