import Image from "next/image";
import React from "react";

export const UsersList = () => {
  return (
    <section className="w-full mt-4  h-full  flex items-center justify-center flex-col">
      <Image
        src={"/not-found.png"}
        alt="No users found"
        height={100}
        width={100}
      />
      No users found
    </section>
  );
};
