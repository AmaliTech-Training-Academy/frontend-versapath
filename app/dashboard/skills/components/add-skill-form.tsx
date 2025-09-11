"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom-input";
import { useRef, useState } from "react";
import { SheetClose } from "@/components/ui/sheet";
import { Loader } from "lucide-react";
import { FileUpload } from "@/components/custom/file-upload";
import { toast } from "sonner";
import { addSkillSchema, AddSkillSchemaProps } from "@/lib/schemas/add-skill";
import { CustomSelect } from "@/components/custom/custom-select";
import { CustomTextarea } from "@/components/custom/custom-text-area";
import MultipleSelectChip from "@/components/custom/multiple-selection-input";

const defaultTags = [
  "Web development",
  "Data Science",
  "Machine Learning",
  "Mobile Development",
  "Cloud Computing",
  "Cybersecurity",
  "DevOps",
  "UI/UX Design",
  "Blockchain",
];

export const AddSkillForm = () => {
  const [error, setError] = useState<string | null>(null);
  const form = useForm<AddSkillSchemaProps>({
    resolver: zodResolver(addSkillSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: [], // Initialize as empty array
      cover: undefined,
    },
    mode: "onChange",
  });

  const closeRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (data: AddSkillSchemaProps) => {
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(data);
    toast.success("Skill added successfully", {
      action: {
        label: "Undo",
        onClick: () => {
          // Handle undo action
        },
      },
    });
    form.reset();
    closeRef.current?.click();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <CustomInput label="Skill Name *" type="text" {...field} />
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
          name="category"
          render={({ field }) => (
            <CustomSelect
              label="Category"
              selectValues={["Category1", "category2"]}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <CustomSelect
              label="Difficulty"
              selectValues={["Beginner", "Intermediate", "Advanced"]}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="estimatedHours"
          render={({ field }) => (
            <CustomInput label="Estimated hours" type="text" {...field} />
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <MultipleSelectChip
                defaultTags={defaultTags}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select tags"
                label="Tags *"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FileUpload
              label="Cover"
              value={field.value}
              onChangeAction={field.onChange}
            />
          )}
        />
        {error && <p className="text-red-text text-sm mt-2">{error}</p>}
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
            {form.formState.isSubmitting && <Loader className="animate-spin" />}
            Add Skill
          </Button>
        </div>

        <SheetClose ref={closeRef} className="hidden" />
      </form>
    </Form>
  );
};
