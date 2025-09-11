"use client";
import React from "react";
import { Loader, PenBox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetWrapper } from "../../components/sheet-wrapper";
import { EditUserForm } from "./components/edit-user-form";
import { UserProfileCard } from "./components/user-profile-card";
import { UserBadges } from "./components/user-badges-card";
import { GrowthTrack } from "./components/growth-track-card";
import { MentorReviewCard } from "./components/mentor-review-card";
import Link from "next/link";
import { User } from "@/lib/types/api";
import Image from "next/image";
import { PageHeader } from "./components/page-header";
import { useParams } from "next/navigation";
import { useFetchSingleUser } from "@/lib/api/users";
import { EditUserPopoverTrigger } from "./components/edit-user-popover-trigger";

export default function UserPage() {
  const { userId } = useParams();
  const { user: response, isFetchingSingleUser } = useFetchSingleUser(
    userId as string
  );

  if (isFetchingSingleUser)
    return (
      <div className="w-full py-5 text-base h-full flex flex-col items-center justify-center text-center rounded-lg bg-red-fill/10 max-w-[500px] mx-auto space-y-2">
        <Loader className="animate-spin" size={40} />
        <p>Loading user data...</p>
      </div>
    );
  if (!response?.success)
    return (
      <div className="w-full py-5 text-base h-full flex flex-col items-center justify-center text-center rounded-lg bg-red-fill/10 max-w-[500px] mx-auto space-y-2">
        <Image
          src={"/not-found.png"}
          alt="No users found"
          height={100}
          width={100}
        />
        <p>
          There were unexpected error. Please refresh the page or consider going
          back and trying again.
        </p>
        <div className="flex gap-2">
          <Link href={"/dashboard/user-management"}>
            <Button variant={"ghost"} className="bg-base-light-overlay/50">
              Go back
            </Button>
          </Link>
          <Button
            variant={"outline"}
            className="bg-base-light-overlay/50"
            onClick={() => window.location.reload()}
          >
            Reload
          </Button>
        </div>
      </div>
    );
  const user = response?.data;
  return (
    <>
      <PageHeader firstName={user?.firstName} lastName={user?.lastName} />
      <div className="flex flex-row w-full gap-4">
        <section className="w-full space-y-4 max-w-1/3 ">
          <article className="w-full p-4 space-y-4 border bg-base-light-white rounded-xl border-gray-stroke-weak">
            <UserProfileCard user={user as User} />

            <EditUserPopoverTrigger user={user as User} />
            {/* 
            <SheetWrapper
              headerTitle="Edit user Profile"
              headerDescription="Update user information"
              trigger={
                <Button variant={"ghost"} className="bg-base-light-overlay/50">
                  <PenBox />
                  Edit user
                </Button>
              }
            >
              <EditUserForm initialData={user as User} />
            </SheetWrapper> */}
          </article>
          <UserBadges />
        </section>
        <section className="w-full space-y-4">
          <GrowthTrack />
          <MentorReviewCard />
        </section>
      </div>
    </>
  );
}
