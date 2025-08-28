"use client";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "../components/header";
import { TopActions } from "../components/top-actions";
import { SheetAction } from "./components/sheet-action"
import { UsersList } from "./components/users-list";
import { Plus } from "lucide-react";
import { InviteUserForm } from "./components/invite-user-form";
import { usersMockData } from "@/lib/mocks/users";

export default function UserManagementPage() {
  return (
    <>
      <DashboardHeader title="User Management" />
      <section className="p-3 mb-5 rounded-lg bg-sidebar h-fit">
        <TopActions
          searchPlaceholder="Search by name, role, email..."
          rightActions={
            <SheetAction
              headerTitle="Invite User"
              headerDescription="Send an invitation to join the platform with a specific role. Use comma (,) to separate emails"
              trigger={
                <Button>
                  <Plus /> Invite User
                </Button>
              }
            >
              <InviteUserForm />
            </SheetAction>
          }
        />
        <UsersList users={usersMockData} />
      </section>
    </>
  );
}
