"use client";
import React from "react";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CustomInput } from "@/components/custom/custom-input";
import { CustomSelect } from "@/components/custom/custom-select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  assessmentSchema,
  AssessmentSchemaProps,
} from "@/lib/schemas/assesments";
import { CustomTextarea } from "@/components/custom/custom-text-area";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useFetchSkills } from "@/lib/api/skills";
import { apiRequest } from "@/lib/api/api-request";
import { toast } from "sonner";

export const CreateAssesmentForm = () => {
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const { skills, isFetchingSkills } = useFetchSkills();
  const form = useForm({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      instructions: "Answer all questions carefully",
    },
  });
  const onSubmit = async (data: AssessmentSchemaProps) => {
    const fetchedSkills = skills?.data?.items || [];
    const selectedSkillId = fetchedSkills.find(
      (skill) => skill.name === data.skillName
    )?.id;

    const res = await apiRequest("/assessment", "POST", {
      ...data,
      skillCapsuleId: selectedSkillId,
    });
    if (!res.success) toast.error(res.message || "Failed to create assessment");
    else {
      toast.success("Assessment created successfully");
      closeRef.current?.click();
    }
  };
  if (isFetchingSkills) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Loader className="animate-spin" size={30} />
      </div>
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="assessmentName"
          control={form.control}
          render={({ field }) => (
            <CustomInput label="Assessment name *" {...field} />
          )}
        />
        <FormField
          name="skillName"
          control={form.control}
          render={({ field }) => (
            <CustomSelect
              label="Skill"
              onChange={field.onChange}
              value={field.value}
              selectValues={
                skills?.data?.items.map((skill) => skill.name) || []
              }
            />
          )}
        />
        <FormField
          name="assessmentType"
          control={form.control}
          render={({ field }) => (
            <CustomSelect
              label="Type"
              onChange={field.onChange}
              value={field.value}
              selectValues={["QUIZ", "ASSIGNMENT", "PROJECT"]}
            />
          )}
        />

        <FormField
          name="passingScore"
          control={form.control}
          render={({ field: { onChange, value, ...field } }) => (
            <CustomInput
              label="Passing Score (%)"
              type="number"
              inputMode="numeric"
              value={value?.toString() || ""}
              onChange={(e) => {
                const value = e.target.value;
                onChange(value === "" ? 0 : parseFloat(value) || 0);
              }}
              {...field}
            />
          )}
        />

        <FormField
          name="timeLimitMinutes"
          control={form.control}
          render={({ field: { onChange, value, ...field } }) => (
            <CustomInput
              label="Time Limit (Minutes)"
              type="number"
              inputMode="numeric"
              value={value?.toString() || ""}
              onChange={(e) => {
                const value = e.target.value;
                onChange(value === "" ? 0 : parseFloat(value) || 0);
              }}
              {...field}
            />
          )}
        />

        <FormField
          name="maxAttempts"
          control={form.control}
          render={({ field: { onChange, value, ...field } }) => (
            <CustomInput
              label="Max Attempts"
              type="number"
              inputMode="numeric"
              value={value?.toString() || ""}
              onChange={(e) => {
                const value = e.target.value;
                onChange(value === "" ? 0 : parseFloat(value) || 0);
              }}
              {...field}
            />
          )}
        />
        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <CustomTextarea label="Instructions" {...field} />
          )}
        />
        <div className="flex justify-end space-x-3 mb-5">
          <SheetClose asChild>
            <Button variant={"outline"} ref={closeRef}>
              Cancel
            </Button>
          </SheetClose>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader className=" animate-spin" />
            )}
            Send Invite
          </Button>
        </div>
      </form>
    </Form>
  );
};
