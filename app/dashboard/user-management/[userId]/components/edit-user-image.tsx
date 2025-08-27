import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
export const EditUserImage = () => {
  return (
    <article className="relative inline-flex items-center gap-5">
      <div className="relative border-gray-200">
        <Image
          className="object-cover w-20 h-20 border rounded-full border-base-dark-background"
          src="https://placehold.co/100x100/png"
          width={40}
          height={40}
          alt="Avatar"
        />
        <Camera className="absolute bottom-0 right-0 w-8 h-8 p-1 rounded-full bg-brand-primary-text text-base-light-white" />
      </div>
      <div className="inline-flex flex-col items-start justify-center flex-1 gap-1">
        <Link
          href={"#"}
          className="text-sm font-semibold leading-snug text-gray-text-strong/90"
        >
          Change Photo
        </Link>
        <Link
          href={"#"}
          className="text-sm font-normal leading-snug text-gray-text-strong/70"
        >
          Upload a photo from your device
        </Link>
      </div>
    </article>
  );
};
