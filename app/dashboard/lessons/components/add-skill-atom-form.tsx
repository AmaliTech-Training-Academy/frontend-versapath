"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SkillAtomSchema } from "@/lib/schemas/lesson";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SheetClose } from "@/components/ui/sheet";
import {  Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom-input";
import { CustomTextarea } from "@/components/custom/custom-text-area";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { createAtom } from "@/lib/api/skill-atom-api";
import { toast } from "sonner";
type SkillAtomFormValues = z.infer<typeof SkillAtomSchema>;

interface AddSkillAtomFormProps {
  onSuccess?: () => void;
}

export const AddSkillAtomForm: React.FC<AddSkillAtomFormProps> = ({
  onSuccess,
}) => {
  const form = useForm<SkillAtomFormValues>({
    resolver: zodResolver(SkillAtomSchema),
    defaultValues: {
      lessonName: "",
      description: "",
      objectives: "",
      moodleUrl: "",
      hours: "2",
      status: "draft",
    },
  });

  const onSubmit = async (data: SkillAtomFormValues) => {
    const payload = {
      name: data.lessonName,
      description: data.description ?? "",
      objectives: data.objectives ?? "",
      estimatedHours:
        typeof data.hours === "string" ? Number(data.hours) : data.hours,
      status: data.status === "publish" ? "ACTIVE" : "INACTIVE",
    };

    const newAtom = await createAtom(payload);
    if (newAtom) {
      toast.success("New Lesson Added successfully");
      form.reset();
      if (onSuccess) onSuccess();
    } else {
      toast.error("Failed to add lesson, Please try again later.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="lessonName"
          render={({ field }) => (
            <CustomInput label="Lesson Name" type="text" {...field} />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <CustomTextarea
              label="Description"
              placeholder="Brief description of this category..."
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="objectives"
          render={({ field }) => (
            <CustomTextarea
              label="Objectives"
              placeholder="Brief description of this category..."
              {...field}
            />
          )}
        />

        <FormField
          control={form.control}
          name="moodleUrl"
          render={({ field }) => (
            <CustomTextarea
              label="Moodle Content URL"
              placeholder="https://example.com"
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="hours"
          render={({ field }) => (
            <CustomInput
              label="Hours *"
              type="number"
              min={1}
              placeholder="Enter estimated hours"
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Skill Status *
                <QuestionMarkCircleIcon className="size-5 font-bold text-brand-primary-stroke-strong" />
              </FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-6"
              >
                <FormControl>
                  <RadioGroupItem value="draft" id="draft" />
                </FormControl>
                <FormLabel htmlFor="draft">Draft</FormLabel>
                <FormControl>
                  <RadioGroupItem value="publish" id="publish" />
                </FormControl>
                <FormLabel htmlFor="publish">Publish</FormLabel>
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-3 pb-4">
          <SheetClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </SheetClose>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader className=" animate-spin" />
            )}
            Save Lesson
          </Button>
        </div>
      </form>
    </Form>
  );
};
