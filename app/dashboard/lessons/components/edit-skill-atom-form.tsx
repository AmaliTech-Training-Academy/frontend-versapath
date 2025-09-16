"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SkillAtomSchema } from "@/lib/schemas/lesson";
import type { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SheetClose } from "@/components/ui/sheet";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom-input";
import { CustomTextarea } from "@/components/custom/custom-text-area";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { atomApi } from "@/lib/api/skill-atom-api";
import { toast } from "sonner";
import { SkillAtom } from "@/lib/types/skill-atom";

type SkillAtomFormValues = z.infer<typeof SkillAtomSchema>;

interface EditSkillAtomFormProps {
  skillAtom: SkillAtom;
  onSuccess?: (updated: SkillAtom) => void; 
}

export const EditSkillAtomForm: React.FC<EditSkillAtomFormProps> = ({
  skillAtom,
  onSuccess,
}) => {
  const form = useForm<SkillAtomFormValues>({
    resolver: zodResolver(SkillAtomSchema),
    defaultValues: {
      lessonName: skillAtom.name,
      description: skillAtom.description,
      objectives: skillAtom.objectives,
      moodleUrl: "",
      hours: String(skillAtom.estimatedHours),
     status: skillAtom.status === "ACTIVE" ? "publish" : "draft",
    },
  });


  const onSubmit = async (data: SkillAtomFormValues) => {
    try {
      const payload = {
        name: data.lessonName,
        description: data.description ?? "",
        objectives: data.objectives ?? "",
        estimatedHours:
          typeof data.hours === "string" ? Number(data.hours) : data.hours,
        status: data.status === "publish" ? "ACTIVE" as const : "INACTIVE" as const,
      };
      const updated = await atomApi.updateAtom(skillAtom.id, payload);
      toast.success("Lesson updated successfully");
      if (updated) {
        onSuccess?.(updated);
      }
    } catch {
      toast.error("Failed to update lesson");
    }
  };

  if (!skillAtom) return <div>Loading...</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="lessonName"
          render={({ field }) => (
            <CustomInput label="Lesson Name"  {...field} />
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
                Lesson Status *
                <QuestionMarkCircleIcon className="size-5 text-brand-primary-stroke-strong" />
              </FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="draft" id="draft" />
                  <FormLabel htmlFor="draft">Save to draft</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="publish" id="publish" />
                  <FormLabel htmlFor="publish">Publish</FormLabel>
                </div>
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-3 pb-4">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader className="animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};
