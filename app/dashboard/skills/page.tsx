"use client";
import { DashboardHeader } from "../components/header";
import { TopActions } from "../components/top-actions";
import { SheetWrapper } from "../components/sheet-wrapper";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddSkillForm } from "./components/add-skill-form";
import { SKillsContentsSection } from "./components/skills-contents-section";
import { useCheckRole } from "@/lib/hooks/use-check-role";
import { StreakBanner } from "./components/streak-banner";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

function SkillCapsulePage() {
  const { isLearner, isAdmin } = useCheckRole();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || ""
  );

  // Update URL params when search or filter changes
  const updateUrlParams = useCallback(
    (search: string, status: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      if (status && status !== "all") {
        params.set("status", status);
      } else {
        params.delete("status");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchQuery(value);
      updateUrlParams(value, statusFilter);
    },
    [statusFilter, updateUrlParams]
  );

  const handleStatusFilter = useCallback(
    (value: string) => {
      const normalizedValue = value === "all" ? "" : value;
      setStatusFilter(normalizedValue);
      updateUrlParams(searchQuery, normalizedValue);
    },
    [searchQuery, updateUrlParams]
  );

  // Initialize state from URL params on mount
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlStatus = searchParams.get("status") || "";
    setSearchQuery(urlSearch);
    setStatusFilter(urlStatus);
  }, [searchParams]);

  return (
    <>
      <DashboardHeader title="Skills" />
      {isLearner && <StreakBanner />}
      <section className="mb-6">
        <TopActions
          searchPlaceholder="Search by skills"
          isRoleFilterable={false}
          onSearch={handleSearch}
          onStatusFilter={handleStatusFilter}
          searchValue={searchQuery}
          statusValue={statusFilter || "all"}
          rightActions={
            isAdmin && (
              <SheetWrapper
                headerTitle="Add a skill"
                headerDescription="Add a new skill to your learning path"
                trigger={
                  <Button>
                    <Plus /> Add a Skill
                  </Button>
                }
              >
                <AddSkillForm />
              </SheetWrapper>
            )
          }
        />
      </section>
      <SKillsContentsSection
        searchQuery={searchQuery}
        statusFilter={statusFilter}
      />
    </>
  );
}

export default SkillCapsulePage;
