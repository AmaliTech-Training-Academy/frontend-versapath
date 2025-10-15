"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/custom/data-table";
import { dummyTalentReadiness } from "@/lib/api/dummy-talent-readiness";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { SheetWrapper } from "../../components/sheet-wrapper";
import { TagsSheet } from "./tags-sheet";

type Talent = (typeof dummyTalentReadiness)[0];

export const TalentList: React.FC = () => {
  const allData: Talent[] = dummyTalentReadiness ?? [];

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const columns = useMemo<ColumnDef<Talent>[]>(() => {
    if (!allData.length) return [];
    const cols: ColumnDef<Talent>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          return (
            <div className="font-medium ">
              <div className="text-[14px] text-gray-text-strong font-semibold hover:underline  cursor-pointer">
                {row.original.name || "N/A"}
              </div>
              <p className="text-[14px] font-normal text-gray-text-weak">
                {row.original.talentRoute || "N/A"}
              </p>
            </div>
          );
        },
        enableHiding: false,
      },
      {
        accessorKey: "assessment",
        header: "Assessment",
        cell: ({ row }) => (
          <span className="capitalize">
            {row.original.assessmentPerformance}
          </span>
        ),
      },
      {
        accessorKey: "projects",
        header: "Projects",
        cell: ({ row }) => (
          <span className="capitalize">{row.original.projectsSubmissions}</span>
        ),
      },
      {
        accessorKey: "skillProgress",
        header: "Skill Progress",
        cell: ({ row }) => (
          <span className="capitalize">{row.original.skillProgress}</span>
        ),
      },
      {
        accessorKey: "skillsAndTags",
        header: "Skills & Tags",
        cell: ({ row }) => (
          <span className="flex flex-wrap gap-1 max-w-[150px]">
            {row.original.skillTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-gray-stroke-weaker text-gray-text-weak border rounded-full px-2 py-[2px] border-gray-stroke-weak text-xs"
              >
                {tag}
              </span>
            ))}
            {row.original.skillTags.length - 3 > 0 && (
              <span className="text-gray-500 text-xs">
                +{row.original.skillTags.length - 3} more
              </span>
            )}
          </span>
        ),
      },
      {
        accessorKey: "readinessStatus",
        header: "Readiness",
        cell: ({ row }) => (
          <span className=" px-2 py-1 rounded-md border border-destructive bg-destructive/10 text-destructive w-fit">
            {row.original.readinessStatus}
          </span>
        ),
      },
    ];

    return cols;
  }, [allData]);

  return (
    <>
      <section className="space-y-2 block w-full my-4">
        <p>Filter by Tags: </p>
        <article className="w-full grid grid-cols-[1fr_auto] gap-2 items-center">
          <div className=" w-full max-w-full flex gap-2 line-clamp-1">
            {Array(20)
              .fill(null)
              .map((_, index) => (
                <span
                  key={index}
                  className="bg-gray-stroke-weaker text-nowrap text-gray-text-weak border rounded-full px-2 py-[2px] border-gray-stroke-weak text-xs"
                >
                  Tag {index + 1}
                </span>
              ))}
          </div>
          <TagsSheet />
        </article>
      </section>
      <DataTable<Talent>
        data={dummyTalentReadiness}
        columns={columns}
        pagination={pagination}
        setPaginationAction={() => {}}
        pageMeta={{ page: 0, size: 0, totalPages: 0 }}
        allItemsCount={allData.length}
        filteredItemsCount={0}
        hasFilters={!!(searchQuery || (statusFilter && statusFilter !== "all"))}
      />
    </>
  );
};
