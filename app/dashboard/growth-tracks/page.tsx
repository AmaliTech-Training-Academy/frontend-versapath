"use client";
import { DashboardHeader } from "../components/header";
import { TopActions } from "../components/top-actions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TracksList } from "./components/tracks-list";
import { SheetWrapper } from "../components/sheet-wrapper";
import { AddGrowthTrackForm } from "./components/add-growth-track-form";
import { useListQuery } from "@/lib/hooks/use-list-query";

export default function GrowthTrackPage() {
  const [, setQuery] = useListQuery();
  return (
    <>
      <DashboardHeader title="Growth tracks" />
      <section className="bg-sidebar p-3 rounded-lg flex-grow">
        <TopActions
          searchPlaceholder="Search by growth track name"
          onSearch={(val) => setQuery({ name: val })}
          rightActions={
            <SheetWrapper
              headerTitle="Add a Growth track"
              headerDescription="Add a new growth track  to manage skills and growth tracks"
              trigger={
                <Button>
                  <Plus /> Add grow track
                </Button>
              }
            >
              <AddGrowthTrackForm />
            </SheetWrapper>
          }
        />
        <TracksList />
      </section>
    </>
  );
}
