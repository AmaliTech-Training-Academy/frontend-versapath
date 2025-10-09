"use client";
import { DashboardHeader } from "../components/header";
import { TopActions } from "../components/top-actions";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { useListQuery } from "@/lib/hooks/use-list-query";
import { TalentList } from "./component/talent-list";

export default function TalentReadinessPage() {
  const [, setQuery] = useListQuery();
  return (
    <>
      <DashboardHeader title="Talent readiness" />
      <section className="bg-sidebar p-3 rounded-lg flex-grow">
        <TopActions
          searchPlaceholder="Search by learner name"
          onSearch={(val) => setQuery({ name: val })}
          isRoleFilterable={false}
          rightActions={
            <Button>
              <DownloadIcon /> Export
            </Button>
          }
        />
        <TalentList />
      </section>
    </>
  );
}
