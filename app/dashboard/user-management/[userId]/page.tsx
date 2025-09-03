import React from "react";
import { ChevronRight, PenBox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetWrapper } from "../../components/sheet-wrapper";
import { EditUserForm } from "./components/edit-user-form";
import { UserProfileCard } from "./components/user-profile-card";
import { UserBadges } from "./components/user-badges-card";
import { GrowthTrack } from "./components/growth-track-card";
import { MentorReviewCard } from "./components/mentor-review-card";
import Link from "next/link";
import { ApiResponse, User } from "@/lib/types/api";
import Image from "next/image";

type userPageProps = {
  readonly params: Promise<{ readonly userId: string }>;
};

export default async function userPage({ params }: userPageProps) {
  const { userId } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_AUTHORIZATION!,
      },
    }
  );
  if (!response.ok)
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
        <Link href={"/dashboard/user-management"}>
          <Button variant={"ghost"} className="bg-base-light-overlay/50">
            Go back
          </Button>
        </Link>
      </div>
    );
  const { data: user }: ApiResponse<User> = await response.json();
  return (
    <>
      <article className="flex items-start gap-2 mt-2 mb-4">
        <Link
          href="/dashboard/user-management"
          className="inline-block text-xs leading-tight transition-all text-gray-text-strong hover:underline underline-offset-2"
        >
          User Management
        </Link>
        <ChevronRight className="w-4 h-4 text-neutral-900/30" />
        <p className="justify-start text-xs font-semibold leading-tight text-center text-brand-primary-text">
          {user?.firstName ?? "N/A"} {user?.lastName ?? "N/A"}
        </p>
      </article>
      <div className="flex flex-row w-full gap-4">
        <section className="w-full space-y-4 max-w-1/3 ">
          <article className="w-full p-4 space-y-4 border bg-base-light-white rounded-xl border-gray-stroke-weak">
            <UserProfileCard user={user as User} />

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
            </SheetWrapper>
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
