"use client";
import React, { useState, useMemo } from "react";
import { SkillCapsuleCard } from "./skill-capsule-card";
import { Pagination } from "@/components/custom/pagination";
import { Loader } from "lucide-react";
import { useFetchSkills } from "@/lib/api/skills";
import Image from "next/image";
import { paginationCalculator } from "@/lib/hooks/pagination-calculator";

interface SKillsContentsSectionProps {
  searchQuery: string;
  statusFilter: string;
}

export const SKillsContentsSection: React.FC<SKillsContentsSectionProps> = ({
  searchQuery,
  statusFilter,
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { skills, isFetchingSkills, fetchSkillsError } = useFetchSkills(
    pagination.pageIndex
  );

  const allItems = skills?.data?.items ?? [];
  const apiTotalElements = skills?.data?.pagination.totalElements;
  // Filter and search logic
  const filteredItems = useMemo(() => {
    let filtered = allItems;
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (skill) =>
          skill.name?.toLowerCase().includes(query) ||
          skill.description?.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((skill) => {
        if (statusFilter === "active") {
          return skill.status === "ACTIVE";
        } else if (statusFilter === "inactive") {
          return skill.status === "INACTIVE";
        }
        return true;
      });
    }

    return filtered;
  }, [allItems, searchQuery, statusFilter]);

  // Calculate pagination info for filtered results
  const customPageInfo = useMemo(() => {
    const totalElements =
      (apiTotalElements ?? 0) > pagination.pageSize
        ? apiTotalElements ?? filteredItems.length
        : filteredItems.length;
    const size = pagination.pageSize;
    const page = pagination.pageIndex;
    const totalPages = Math.ceil(totalElements / size);
    const hasNext = page < totalPages - 1;
    const hasPrevious = page > 0;
    return {
      page,
      size,
      totalElements,
      totalPages,
      hasNext,
      hasPrevious,
    };
  }, [filteredItems.length, pagination]);

  const {
    currentPage,
    end,
    nextDisabled,
    prevDisabled,
    start,
    totalItems,
    totalPages,
  } = paginationCalculator({
    items: filteredItems,
    pageInfo: customPageInfo,
    pagination,
  });

  // Reset to first page when filters change
  React.useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  }, [searchQuery, statusFilter]);

  const handleNext = () => {
    if (nextDisabled) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex + 1,
      }));
    }
  };

  const handlePrev = () => {
    if (prevDisabled) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex - 1,
      }));
    }
  };

  const handlePaginationBtnClick = (pageIndex: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex,
    }));
  };

  let content;

  if (isFetchingSkills) {
    content = (
      <section className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Loader className="animate-spin" size={40} />
        <p className="mt-2">Loading skills...</p>
      </section>
    );
  } else if (fetchSkillsError) {
    content = (
      <section className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Image
          src={"/not-found.png"}
          alt="Error loading skills"
          height={100}
          width={100}
        />
        <p className="mt-2">Error loading skills. Please try again.</p>
      </section>
    );
  } else if (!filteredItems.length) {
    const noResultsMessage =
      searchQuery || statusFilter
        ? "No skills match your search criteria."
        : "No skills found. Please add a skill to get started.";

    content = (
      <section className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Image
          src={"/not-found.png"}
          alt="No skills found"
          height={100}
          width={100}
        />
        <p className="mt-2">{noResultsMessage}</p>
      </section>
    );
  } else {
    content = (
      <>
        <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-h-[60vh]">
          {filteredItems.map((skill) => (
            <SkillCapsuleCard key={skill.id} skill={skill} />
          ))}
        </article>

        <article className="text-center flex justify-between mt-6 w-full">
          <p className="text-gray-text-weak">
            Showing {start} to {end} of {totalItems} entries
            {(searchQuery || statusFilter) &&
              ` (filtered from ${allItems.length} total)`}
          </p>
          <Pagination
            handleNext={handleNext}
            handlePaginationBtnClick={handlePaginationBtnClick}
            handlePrev={handlePrev}
            nextDisabled={!nextDisabled}
            prevDisabled={!prevDisabled}
            totalPages={totalPages}
            activePage={currentPage + 1}
          />
        </article>
      </>
    );
  }

  return <>{content}</>;
};
