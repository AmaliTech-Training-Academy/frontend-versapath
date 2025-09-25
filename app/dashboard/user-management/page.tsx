"use client";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "../components/header";
import { TopActions } from "../components/top-actions";
import { UsersList } from "./components/users-list";
import { Plus } from "lucide-react";
import { InviteUserForm } from "./components/invite-user-form";
import { SheetWrapper } from "../components/sheet-wrapper";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

function UserManagementPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || ""
  );
  const [roleFilter, setRoleFilter] = useState(searchParams.get("role") || "");

  // Update URL params when search or filter changes
  const updateUrlParams = useCallback(
    (search: string, status: string, role: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      if (status && status !== "all") {
        params.set("status", status);
      } else {
        params.delete("status");
      }

      if (role && role !== "all") {
        params.set("role", role);
      } else {
        params.delete("role");
      }

      // Remove page when filters change
      params.delete("page");

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchQuery(value);
      updateUrlParams(value, statusFilter, roleFilter);
    },
    [statusFilter, roleFilter, updateUrlParams]
  );

  const handleStatusFilter = useCallback(
    (value: string) => {
      const normalizedValue = value === "all" ? "" : value;
      setStatusFilter(normalizedValue);
      updateUrlParams(searchQuery, normalizedValue, roleFilter);
    },
    [searchQuery, roleFilter, updateUrlParams]
  );

  const handleRoleFilter = useCallback(
    (value: string) => {
      const normalizedValue = value === "all" ? "" : value;
      setRoleFilter(normalizedValue);
      updateUrlParams(searchQuery, statusFilter, normalizedValue);
    },
    [searchQuery, statusFilter, updateUrlParams]
  );

  // Initialize state from URL params on mount
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlStatus = searchParams.get("status") || "";
    const urlRole = searchParams.get("role") || "";
    setSearchQuery(urlSearch);
    setStatusFilter(urlStatus);
    setRoleFilter(urlRole);
  }, [searchParams]);

  return (
    <>
      <DashboardHeader title="User Management" />
      <section className="p-3 mb-5 rounded-lg bg-sidebar h-fit">
        <TopActions
          searchPlaceholder="Search by name, role, email..."
          rightActions={
            <SheetWrapper
              headerTitle="Invite User"
              headerDescription="Send an invitation to join the platform with a specific role. Use comma (,) to separate emails"
              trigger={
                <Button>
                  <Plus /> Invite User
                </Button>
              }
            >
              <InviteUserForm />
            </SheetWrapper>
          }
          isRoleFilterable={true}
          isStatusFilterable={true}
          onSearch={handleSearch}
          onStatusFilter={handleStatusFilter}
          onRoleFilter={handleRoleFilter}
          searchValue={searchQuery}
          statusValue={statusFilter || "all"}
        />
        <UsersList
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          roleFilter={roleFilter}
        />
      </section>
    </>
  );
}

export default UserManagementPage;
