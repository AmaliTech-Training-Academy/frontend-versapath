import React from "react";
import { ChevronRight, PenBox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetWrapper } from "../../components/sheet-wrapper";
import { EditUserForm } from "./components/edit-user-form";
import { UserProfileCard } from "./components/user-profile-card";
import { UserBadges } from "./components/user-badges-card";
import { GrowthTrack } from "./components/growth-track-card";
import { MentorReviewCard } from "./components/mentor-review-card";

type SingleUserPageProps = {
  readonly params: Promise<{ readonly userId: string }>;
};

export default async function SingleUserPage({ params }: SingleUserPageProps) {
  const { userId } = await params;

  return (
    <>
      <article className="flex items-start gap-2 mt-2 mb-4">
        <p className="inline-block text-xs leading-tight text-gray-text-strong">
          User Management
        </p>
        <ChevronRight className="w-4 h-4 text-neutral-900/30" />
        <p className="justify-start text-xs font-semibold leading-tight text-center text-brand-primary-text">
          Mary Mensah
        </p>
      </article>
      <div className="flex flex-row w-full gap-4">
        <section className="w-full space-y-4 max-w-1/3 ">
          <article className="w-full p-4 space-y-4 border bg-base-light-white rounded-xl border-gray-stroke-weak">
            <UserProfileCard />

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
              <EditUserForm />
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
