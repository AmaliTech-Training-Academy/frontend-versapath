import { DataTable } from "@/components/custom/data-table";
import React from "react";

export const UsersList = () => {
  return (
    <>
      {/* <section className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Image
          src={"/not-found.png"}
          alt="No users found"
          height={100}
          width={100}
        />
        No users found
      </section> */}
      <DataTable data={testData} />
    </>
  );
};

const makeTestData = (i: number) => ({
  id: i,
  user: "John Doe",
  email: "favoureliab@gmail.com",
  role: ["Admin", "User", "Guest"][Math.floor(Math.random() * 3)],
  status: ["Active", "Inactive", "Suspended"][Math.floor(Math.random() * 3)],
  joinDate: "12/03/2023",
  stack: "string",
});
const testData = Array.from({ length: 100 }, (_, i) => makeTestData(i));
