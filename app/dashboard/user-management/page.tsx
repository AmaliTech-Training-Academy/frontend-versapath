import { usersMockData } from "@/lib/mocks/users";
import { DashboardHeader } from "../components/header";
import { TopActions } from "../components/top-actions";
import { UsersList } from "./components/users-list";
export default function UserManagementPage() {
  return (
    <>
      <DashboardHeader title="User Management" />
      <section className="p-3 mb-5 rounded-lg bg-sidebar h-fit">
        <TopActions />
        <UsersList users={usersMockData} />
      </section>
    </>
  );
}
