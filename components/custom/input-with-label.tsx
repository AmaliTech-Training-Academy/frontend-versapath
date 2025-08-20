import React from "react";
import { Input } from "../ui/input";

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  placeholder?: string;
}
export const InputWIthLabel: React.FC<InputWithLabelProps> = () => {
  return (
    <fieldset>
      <label htmlFor="">Confirm Password</label>
      <Input />
    </fieldset>
  );
};
