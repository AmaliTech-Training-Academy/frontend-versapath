import { Select } from "@/components/custom/custom-selector";
import { Input } from "@/components/ui/input";
import { Roles } from "@/lib/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef } from "react";

export interface TopActionsProps {
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  onStatusFilter?: (value: string) => void;
  onRoleFilter?: (value: string) => void;
  rightActions?: React.ReactNode;
  debounceMs?: number;
  isRoleFilterable?: boolean;
  isStatusFilterable?: boolean;
  searchValue?: string; // Add this prop
  statusValue?: string; // Add this prop for status filter
}

const ROLE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "mentor", label: "Mentor" },
  { value: "learner", label: "Learner" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const TopActions: React.FC<TopActionsProps> = ({
  searchPlaceholder = "Search...",
  onSearch,
  onStatusFilter,
  onRoleFilter,
  rightActions,
  debounceMs = 500,
  isRoleFilterable = true,
  isStatusFilterable = true,
  searchValue = "",
  statusValue = "",
}) => {
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data: session } = useSession();
  const canView = session?.user.role === Roles.ADMIN;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onSearch?.(value);
    }, debounceMs);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("searchInput") as string;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    onSearch?.(searchValue || "");
  };

  const handleStatusChange = (value: string) => {
    onStatusFilter?.(value);
  };

  const handleRoleChange = (value: string) => {
    onRoleFilter?.(value);
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="flex flex-col items-start justify-between w-full gap-3 sm:flex-row">
      <article className="flex flex-col w-full gap-3 md:flex-row">
        <form
          className="flex items-center max-w-[340px] w-full"
          onSubmit={handleSubmit}
        >
          <Input
            onChange={handleChange}
            placeholder={searchPlaceholder}
            name="searchInput"
            defaultValue={searchValue}
          />
        </form>
        {canView && (
          <div className="flex items-center gap-2">
            Filter:
            {isRoleFilterable && (
              <Select
                placeholder="All roles"
                options={ROLE_OPTIONS}
                handlevalueChange={handleRoleChange}
              />
            )}
            {isStatusFilterable && (
              <Select
                placeholder="All statuses"
                options={STATUS_OPTIONS}
                handlevalueChange={handleStatusChange}
                defaultValue={statusValue || "all"} // Set default value for status filter
              />
            )}
          </div>
        )}
      </article>
      {canView && rightActions}
    </section>
  );
};
