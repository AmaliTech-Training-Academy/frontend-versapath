import { Select } from "@/components/custom/custom-selector";
import { Input } from "@/components/ui/input";
import React from "react";
import { AddUserSheet } from "../user-management/components/add-user-sheet";

export const TopActions = () => {
  return (
    <section className="w-full flex justify-between gap-2 items-start">
      <article className="flex flex-row gap-3 w-full">
        <SearchComponent />
        <div className="flex gap-2 items-center">
          Filter:
          <Select placeholder="All roles" options={rolesOptions} />
          <Select placeholder="All statuses" options={statusOptions} />
        </div>
      </article>
      <AddUserSheet />
    </section>
  );
};
const rolesOptions = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "learner", label: "Learner" },
];
const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];
const SearchComponent = () => {
  return (
    <form className="flex items-center max-w-[340px] w-full">
      <Input placeholder="Search..." />
    </form>
  );
};
