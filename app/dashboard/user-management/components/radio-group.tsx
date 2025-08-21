import React from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ControllerRenderProps } from "react-hook-form";
import { InviteUserInputs } from "@/lib/schemas/invite-user";

export const RadioGroupComponent: React.FC<{
  field: ControllerRenderProps<InviteUserInputs, "role">;
}> = ({ field }) => {
  return (
    <FormItem className="space-y-3">
      <FormLabel className="mb-1">Role assignment*</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="flex flex-col"
        >
          <FormItem className="flex items-center gap-3">
            <FormControl>
              <RadioGroupItem value="admin" />
            </FormControl>
            <FormLabel className="font-normal">Admin</FormLabel>
          </FormItem>
          <FormItem className="flex items-center gap-3">
            <FormControl>
              <RadioGroupItem value="manager" />
            </FormControl>
            <FormLabel className="font-normal">Manager</FormLabel>
          </FormItem>
          <FormItem className="flex items-center gap-3">
            <FormControl>
              <RadioGroupItem value="mentor" />
            </FormControl>
            <FormLabel className="font-normal">Mentor</FormLabel>
          </FormItem>
          <FormItem className="flex items-center gap-3">
            <FormControl>
              <RadioGroupItem value="learner" />
            </FormControl>
            <FormLabel className="font-normal">Learner</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
