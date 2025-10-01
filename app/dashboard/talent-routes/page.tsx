"use client";
import { DashboardHeader } from "../components/header";
import { TopActions } from "../components/top-actions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RouteList } from "./components/route-list";
import { SheetWrapper } from "../components/sheet-wrapper";
import { AddTalentRouteForm } from "./components/add-talent-route-form";
import { useListQuery } from "@/lib/hooks/use-list-query";

export default function TalentRoutePage() {
  const [, setQuery] = useListQuery();
  return (
    <>
      <DashboardHeader title="Talent routes" />
      <section className="bg-sidebar p-3 rounded-lg flex-grow">
        <TopActions
          searchPlaceholder="Search by talent route name"
          onSearch={(val) => setQuery({ name: val })}
          rightActions={
            <SheetWrapper
              headerTitle="Add Talent route"
              headerDescription="Add a new talent route  to manage skills and growth tracks"
              trigger={
                <Button>
                  <Plus /> Add a Talent
                </Button>
              }
            >
              <AddTalentRouteForm />
            </SheetWrapper>
          }
        />
        <RouteList />
      </section>
    </>
  );
}
