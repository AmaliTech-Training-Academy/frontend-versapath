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
import { FetchedRolesProps } from "@/lib/types/api";

export const RadioGroupComponent: React.FC<{
  field: ControllerRenderProps<InviteUserInputs, "role">;
  roles: FetchedRolesProps[];
}> = ({ field, roles }) => {
  return (
    <FormItem className="space-y-3">
      <FormLabel className="mb-1">Role assignment*</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="flex flex-col"
        >
          {roles.map(({ role, id }) => (
            <FormItem className="flex items-center gap-3" key={id}>
              <FormControl>
                <RadioGroupItem value={id} />
              </FormControl>
              <FormLabel className="font-normal capitalize">
                {role.toLocaleLowerCase()}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
