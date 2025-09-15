"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom-input";
import { useEffect, useRef, useState } from "react";
import { SheetClose } from "@/components/ui/sheet";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { addSkillSchema, AddSkillSchemaProps } from "@/lib/schemas/add-skill";
import { CustomSelect } from "@/components/custom/custom-select";
import { CustomTextarea } from "@/components/custom/custom-text-area";
import { MultipleSelectChip } from "@/components/custom/multiple-selection-input";
import { defaultTags } from "@/lib/constants/tags";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchCategories } from "@/lib/redux/slices/category-slice";
import { fetchTags } from "@/lib/redux/slices/tags-slice";
import { DifficultyLevels, ProfficiencyLevels } from "@/lib/types";
import { handleSkillSubmission } from "@/lib/api/skills";
import { mutate } from "swr";
import { init } from "next/dist/compiled/webpack/webpack";
import { FilePicker } from "./file-picker";

interface AddSkillFormProps {
  isEditing?: boolean;
  initialData?: AddSkillSchemaProps;
}
export const AddSkillForm: React.FC<AddSkillFormProps> = ({
  isEditing,
  initialData,
}) => {
  const dispatch = useAppDispatch();
  const { tags, isFetchingTags } = useAppSelector((state) => state.tagsReducer);
  const { categories, isFetchingCategories } = useAppSelector(
    (state) => state.categoriesReducer
  );

  const [error, setError] = useState<string | null>(null);
  const form = useForm<AddSkillSchemaProps>({
    resolver: zodResolver(addSkillSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      objectives: initialData?.objectives || "",
      categories: initialData?.categories || [],
      difficulty: DifficultyLevels[initialData?.difficulty || "BEGINNER"],
      proficiencyLevel:
        ProfficiencyLevels[initialData?.proficiencyLevel || "L1"],
      estimatedHours: initialData?.estimatedHours || "",
      description: initialData?.description || "",
      tags: initialData?.tags || [],
      cover: undefined,
    },
    mode: "onChange",
  });

  const closeRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (data: AddSkillSchemaProps) => {
    setError(null);
    const response = await handleSkillSubmission(data, {
      existingTags: tags,
      existingCategories: categories,
    });

    if (!response.success) {
      setError(
        response.errors?.[0] ||
          response.message ||
          "Failed to add skill. Please try again."
      );
      return;
    }
    mutate((key) => typeof key === "string" && key.startsWith("/capsules"));
    toast.success("Skill added successfully");
    form.reset();
    closeRef.current?.click();
  };

  useEffect(() => {
    if (tags.length === 0) {
      dispatch(fetchTags());
    }
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, tags.length, categories.length]);

  if (isFetchingTags || isFetchingCategories) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Loader className="animate-spin" size={30} />
      </div>
    );
  }
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
          name="objectives"
          render={({ field }) => (
            <CustomTextarea label="Objectives" {...field} />
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <MultipleSelectChip
                defaultTags={
                  categories.length > 0 ? categories.map((val) => val.name) : []
                }
                value={field.value}
                onChange={field.onChange}
                placeholder="Select categories"
                label="Categories *"
                addNewAllowed={false}
              />
              <FormMessage className="-mt-1 text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <CustomSelect
              label="Difficulty"
              selectValues={Object.values(DifficultyLevels)}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="proficiencyLevel"
          render={({ field }) => (
            <CustomSelect
              label="Profficiency Level"
              selectValues={Object.values(ProfficiencyLevels)}
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
                defaultTags={
                  tags.length > 0 ? tags.map((val) => val.name) : defaultTags
                }
                value={field.value}
                onChange={field.onChange}
                placeholder="Select tags"
                label="Tags *"
              />
              <FormMessage className="text-xs -mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FilePicker
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
