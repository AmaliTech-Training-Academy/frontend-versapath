"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {lessonSchema} from "@/lib/schemas/lesson";
import type { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SheetClose } from "@/components/ui/sheet";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom-input";
import { CustomTextarea } from "@/components/custom/custom-text-area";
type LessonFormValues = z.infer<typeof lessonSchema>;

export const AddLessonForm = () => {
  const form = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      lessonName: "",
      description: "",
      objectives: "",
      moodleUrl: "",
      type: "",
      hours: 7,
      status: "draft",
    },
  })

   const onSubmit = (data: LessonFormValues) => {
    console.log("Lesson submitted:", data);

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
                <CustomTextarea label="Description" placeholder="Brief description of this category..." {...field} />
              )}
            />
            <FormField
              control={form.control}
              name="objectives"
              render={({ field }) => (
               <CustomTextarea label="Objectives" placeholder="Brief description of this category..." {...field} />
              )}
            />

            <FormField
              control={form.control}
              name="moodleUrl"
              render={({ field }) => (
                <CustomTextarea label="Moodle Content URL" placeholder="https://example.com" {...field} />
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a lesson type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <CustomInput label="Estimated Hours" type="number" {...field} />
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Status *</FormLabel>
                  <FormControl>
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
                  </FormControl>
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
