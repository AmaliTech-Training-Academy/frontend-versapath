"use client";
import { DataTable } from "@/components/custom/data-table";
import React, { useEffect } from "react";
import Image from "next/image";
import { useFetchUsers } from "@/lib/api/users";
import { Loader } from "lucide-react";
import { User } from "@/lib/types/api";

export const UsersList = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    users: fetchedUsers,
    fetchUsersError,
    isFetchingUsers,
  } = useFetchUsers(pagination.pageIndex);

  useEffect(() => {
    if (fetchedUsers?.data?.items) {
      setUsers(fetchedUsers.data.items);
    }
    console.log(fetchedUsers);
  }, [fetchedUsers?.data?.items]);

  let content;

  if (isFetchingUsers) {
    content = (
      <section className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Loader className="animate-spin" size={30} />
      </section>
    );
  } else if (!users?.length || fetchUsersError) {
    content = (
      <section className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Image
          src={"/not-found.png"}
          alt="No users found"
          height={100}
          width={100}
        />
        No users found
      </section>
    );
  } else {
    content = (
      <>
        <DataTable
          data={users}
          pagination={pagination}
          setPagination={setPagination}
        />
        {/* <div className="flex flex-col items-center justify-between gap-2 md:flex-row"></div> */}
      </>
    );
  }

  return <>{content}</>;
};
