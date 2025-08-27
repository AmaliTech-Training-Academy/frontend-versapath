import React from "react";
import { User } from "lucide-react";

export const UserProfileCard = () => {
  return (
    <>
      <div className="w-full flex gap-2 items-center justify-start">
        <div>
          <User
            className="rounded-full border aspect-square block w-20 h-20 border-base-dark-background"
            strokeWidth={1.2}
          />
        </div>
        <div className="space-y-1 w-full ">
          <p className=" text-lg font-semibold  leading-relaxed">Mary Mensah</p>
          <p className=" text-gray-text-weak text-xs font-normal  leading-tight">
            Learner
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className=" w-full flex justify-between items-center">
          <p className="text-gray-text-strong text-sm font-semibold leading-snug">
            Email:
          </p>
          <p className="text-gray-text-strong text-sm font-normal  leading-snug">
            mary.mensah@amalitech.com
          </p>
        </div>
        <div className=" w-full flex justify-between items-center">
          <p className="text-gray-text-strong text-sm font-semibold leading-snug">
            Phone:
          </p>
          <p className="text-gray-text-strong text-sm font-normal  leading-snug">
            024 844 8839
          </p>
        </div>
        <div className=" w-full flex justify-between items-center">
          <p className="text-gray-text-strong text-sm font-semibold leading-snug">
            Date Joined:
          </p>
          <p className="text-gray-text-strong text-sm font-normal justify-self-end leading-snug">
            03 Aug, 2025
          </p>
        </div>
      </div>
    </>
  );
};
