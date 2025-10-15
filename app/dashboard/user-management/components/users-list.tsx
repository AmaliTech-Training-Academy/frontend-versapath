"use client";
import { DataTable, userColumns } from "@/components/custom/data-table";
import React, { useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import { useFetchUsers } from "@/lib/api/users";
import { Loader } from "lucide-react";
import type { User } from "@/lib/types/api";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface UsersListProps {
  searchQuery?: string;
  statusFilter?: string;
  roleFilter?: string;
}

export const UsersList: React.FC<UsersListProps> = ({
  searchQuery = "",
  statusFilter = "",
  roleFilter = "",
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // zero-based page index sent to API
    pageSize: 10,
  });

  const {
    users: fetchedUsers,
    fetchUsersError,
    isFetchingUsers,
  } = useFetchUsers(pagination.pageIndex);

  const allItems: User[] = fetchedUsers?.data?.items ?? [];
  const totalUsers = fetchedUsers?.data?.pagination.totalElements;
  // Filter and search logic
  const filteredItems = useMemo(() => {
    let filtered = allItems;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.firstName?.toLowerCase().includes(query) ||
          user.lastName?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query) ||
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((user) => {
        if (statusFilter === "active") {
          return user.status === "ACTIVE";
        } else if (statusFilter === "inactive") {
          return user.status === "INACTIVE";
        } else if (statusFilter === "pending") {
          return user.status === "PENDING";
        }
        return true;
      });
    }

    // Apply role filter
    if (roleFilter && roleFilter !== "all") {
      filtered = filtered.filter(
        (user) => user.role?.toLowerCase() === roleFilter.toLowerCase()
      );
    }

    return filtered;
  }, [allItems, searchQuery, statusFilter, roleFilter]);

  // Calculate pagination info for filtered results
  const customPageMeta = useMemo(() => {
    const totalElements =
      (totalUsers ?? 0) > pagination.pageSize
        ? totalUsers ?? filteredItems.length
        : filteredItems.length;
    const size = pagination.pageSize;
    const page = pagination.pageIndex;
    const totalPages = Math.ceil(totalElements / size);

    return {
      page,
      size,
      totalPages: Math.max(totalPages, 1),
      totalItems: totalElements,
    };
  }, [filteredItems.length, pagination]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  }, [searchQuery, statusFilter, roleFilter]);

  // Update URL when pagination changes
  const updateUrlWithPagination = useCallback(
    (pageIndex: number) => {
      const params = new URLSearchParams(searchParams.toString());

      if (pageIndex > 0) {
        params.set("page", (pageIndex + 1).toString()); // Convert to 1-based for URL
      } else {
        params.delete("page");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  // Initialize pagination from URL params
  useEffect(() => {
    const urlPage = searchParams.get("page");
    if (urlPage) {
      const pageIndex = Math.max(parseInt(urlPage) - 1, 0); // Convert from 1-based to 0-based
      setPagination((prev) => ({
        ...prev,
        pageIndex,
      }));
    }
  }, [searchParams]);

  const handlePaginationChange = useCallback(
    (newPagination: { pageIndex: number; pageSize: number }) => {
      setPagination(newPagination);
      updateUrlWithPagination(newPagination.pageIndex);
    },
    [updateUrlWithPagination]
  );

  let content;

  if (isFetchingUsers) {
    content = (
      <section className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Loader className="animate-spin" size={30} />
        <p className="mt-2">Loading users...</p>
      </section>
    );
  } else if (fetchUsersError) {
    content = (
      <section className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Image
          src={"/not-found.png"}
          alt="Error loading users"
          height={100}
          width={100}
        />
        <p className="mt-2">Error loading users. Please try again.</p>
      </section>
    );
  } else if (!filteredItems.length) {
    const noResultsMessage =
      searchQuery || statusFilter || roleFilter
        ? "No users match your search criteria."
        : "No users found.";

    content = (
      <section className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Image
          src={"/not-found.png"}
          alt="No users found"
          height={100}
          width={100}
        />
        <p className="mt-2">{noResultsMessage}</p>
      </section>
    );
  } else {
    content = (
      <DataTable<User>
        data={filteredItems}
        columns={userColumns}
        pagination={pagination}
        setPaginationAction={handlePaginationChange}
        pageMeta={customPageMeta}
        allItemsCount={allItems.length}
        filteredItemsCount={filteredItems.length}
        hasFilters={!!(searchQuery || statusFilter || roleFilter)}
      />
    );
  }

  return <>{content}</>;
};
