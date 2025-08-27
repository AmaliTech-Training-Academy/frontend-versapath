import React from "react";
import Image from "next/image";
export const UserProfileCard = () => {
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
          <p className="text-lg font-semibold leading-relaxed ">Mary Mensah</p>
          <p className="text-xs font-normal leading-tight text-gray-text-weak">
            Learner
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full ">
          <p className="text-sm font-semibold leading-snug text-gray-text-strong">
            Email:
          </p>
          <p className="text-sm font-normal leading-snug text-gray-text-strong">
            mary.mensah@amalitech.com
          </p>
        </div>
        <div className="flex items-center justify-between w-full ">
          <p className="text-sm font-semibold leading-snug text-gray-text-strong">
            Phone:
          </p>
          <p className="text-sm font-normal leading-snug text-gray-text-strong">
            024 844 8839
          </p>
        </div>
        <div className="flex items-center justify-between w-full ">
          <p className="text-sm font-semibold leading-snug text-gray-text-strong">
            Date Joined:
          </p>
          <p className="text-sm font-normal leading-snug text-gray-text-strong justify-self-end">
            03 Aug, 2025
          </p>
        </div>
      </div>
    </>
  );
};
