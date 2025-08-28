import { Select } from "@/components/custom/custom-selector";
import { Input } from "@/components/ui/input";
import React from "react";

export interface TopActionsProps {
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  rightActions?: React.ReactNode;
}

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "learner", label: "Learner" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const TopActions: React.FC<TopActionsProps> = ({
  searchPlaceholder = "Search...",
  onSearch,
  rightActions,
}) => (
  <section className="flex flex-col items-start justify-between w-full gap-3 sm:flex-row">
    <article className="flex flex-col w-full gap-3 md:flex-row">
      <form
        className="flex items-center max-w-[340px] w-full"
        onSubmit={e => {
          e.preventDefault();
          const value = (e.currentTarget.searchInput as HTMLInputElement)?.value;
          onSearch?.(value);
        }}
      >
        <Input placeholder={searchPlaceholder} name="searchInput" />
      </form>
      <div className="flex items-center gap-2">
        Filter:
        <Select placeholder="All roles" options={roleOptions} />
        <Select placeholder="All statuses" options={statusOptions} />
      </div>
    </article>
    {rightActions}
  </section>
);
