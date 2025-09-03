import React from "react";
import Image from "next/image";
import { User } from "@/lib/types/api";
export const UserProfileCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <>
      <div className="flex items-center justify-start w-full gap-2">
        <Image
          className="object-cover w-20 h-20 border rounded-full border-base-dark-background aspect-square"
          src="https://placehold.co/100x100/png"
          width={40}
          height={40}
          alt="Avatar"
        />
        <div className="w-full space-y-1 ">
          <p className="text-lg font-semibold leading-relaxed ">
            {user.firstName ?? "N/A"} {user.lastName ?? ""}
          </p>
          <p className="text-xs font-normal leading-tight text-gray-text-weak">
            {user.role ?? "N/A"}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full ">
          <p className="text-sm font-semibold leading-snug text-gray-text-strong">
            Username:
          </p>
          <p className="text-sm font-normal leading-snug text-gray-text-strong">
            {user.username ?? "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between w-full ">
          <p className="text-sm font-semibold leading-snug text-gray-text-strong">
            Email:
          </p>
          <p className="text-sm font-normal leading-snug text-gray-text-strong">
            {user?.email}
          </p>
        </div>
        <div className="flex items-center justify-between w-full ">
          <p className="text-sm font-semibold leading-snug text-gray-text-strong">
            Date Joined:
          </p>
          <p className="text-sm font-normal leading-snug text-gray-text-strong justify-self-end">
            {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </>
  );
};
