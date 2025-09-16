"use client";
import { DataTable } from "@/components/custom/data-table";
import React from "react";
import Image from "next/image";
import { useFetchUsers } from "@/lib/api/users";
import { Loader } from "lucide-react";
import type { User } from "@/lib/types/api";

export const UsersList = () => {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // zero-based page index sent to API
    pageSize: 10,
  });

  const {
    users: fetchedUsers,
    fetchUsersError,
    isFetchingUsers,
  } = useFetchUsers(pagination.pageIndex);

  const items: User[] = fetchedUsers?.data?.items ?? [];
  const pageInfo = fetchedUsers?.data?.pagination;

  const pageMeta = {
    page: pageInfo?.page ?? pagination.pageIndex,
    size: pageInfo?.size ?? pagination.pageSize,
    totalPages:
      pageInfo?.totalPages ??
      Math.max(
        Math.ceil(
          // fallback if totalElements exists
          (pageInfo?.totalElements ?? items.length) /
            (pageInfo?.size ?? pagination.pageSize)
        ),
        1
      ),
    totalItems: pageInfo?.totalElements,
  };

  let content;

  if (isFetchingUsers || !items.length || fetchUsersError) {
    content = (
      <section className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        {isFetchingUsers ? (
          <Loader className="animate-spin" size={30} />
        ) : (
          (!items.length || fetchUsersError) && (
            <>
              <Image
                src={"/not-found.png"}
                alt="No users found"
                height={100}
                width={100}
              />
              {fetchedUsers?.errors ??
                fetchUsersError?.[0] ??
                "Users not found. Please consider reloading the page"}
            </>
          )
        )}
      </section>
    );
  } else {
    content = (
      <DataTable
        data={items}
        pagination={pagination}
        setPaginationAction={setPagination}
        pageMeta={pageMeta}
      />
    );
  }

  return <>{content}</>;
};
