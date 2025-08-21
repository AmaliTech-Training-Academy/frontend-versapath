import { DashboardHeader } from "../components/header";
import { TopActions } from "../components/top-actions";
import { UsersList } from "./components/users-list";
export default function UserManagementPage() {
  return (
    <>
      <DashboardHeader title="User Management" />
      <section className="bg-sidebar p-3 rounded-lg  h-full">
        <TopActions />
        <UsersList />
      </section>
    </>
  );
}
