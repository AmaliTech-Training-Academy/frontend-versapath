import { ReactNode } from "react";
import { SettingSidebar } from "./components/setting-sidebar";
import { DashboardHeader } from "../components/header";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DashboardHeader title="Settings" />
      <section className="grid grid-cols-4 gap-6 py-5 rounded-xl">
        <SettingSidebar />
        <div className="col-span-3">{children}</div>
      </section>
    </>
  );
}
