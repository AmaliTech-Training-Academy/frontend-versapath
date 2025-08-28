import { DataTable } from "@/components/custom/data-table";
import React from "react";
import Image from "next/image";

export const UsersList = ({ users }: { users: User[] }) => {
  return (
    <>
      {!users?.length ? (
        <section className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
          <Image
            src={"/not-found.png"}
            alt="No users found"
            height={100}
            width={100}
          />
          No users found
        </section>
      ) : (
        <DataTable data={users} />
      )}
    </>
  );
};
