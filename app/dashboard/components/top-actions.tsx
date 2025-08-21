import { Select } from "@/components/custom/custom-selector";
import { Input } from "@/components/ui/input";
import React from "react";
import { AddUserSheet } from "../user-management/components/add-user-sheet";

export const TopActions = () => {
  return (
    <section className="flex flex-col items-start justify-between w-full gap-3 sm:flex-row">
      <article className="flex flex-col w-full gap-3 md:flex-row">
        <SearchComponent />
        <div className="flex items-center gap-2">
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
      <Input placeholder="Search..." name="searchInput" />
    </form>
  );
};
