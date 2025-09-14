"use client";
import React, { useState } from "react";
import { SkillCapsuleCard } from "./skill-capsule-card";
import { Pagination } from "@/components/custom/pagination";
import { Loader } from "lucide-react";
import { useFetchSkills } from "@/lib/api/skills";
import Image from "next/image";
import { paginationCalculator } from "@/lib/hooks/pagination-calculator";

export const SKillsContentsSection = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { skills, isFetchingSkills, fetchSkillsError } = useFetchSkills(
    pagination.pageIndex
  );

  const items = skills?.data?.items ?? [];
  const pageInfo = skills?.data?.pagination ?? null;

  const {
    currentPageZeroBased,
    end,
    nextDisabled,
    prevDisabled,
    start,
    totalItems,
    totalPages,
  } = paginationCalculator({
    items,
    pageInfo,
    pagination,
  });

  const handleNext = () => {
    if (!nextDisabled) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex + 1,
      }));
    }
  };

  const handlePrev = () => {
    if (!prevDisabled) {
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

  if (isFetchingSkills || !items.length || fetchSkillsError) {
    content = (
      <section className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        {isFetchingSkills ? (
          <>
            <Loader className="animate-spin" size={40} />
            <p className="mt-2">Loading skills...</p>
          </>
        ) : (
          (!items.length || fetchSkillsError) && (
            <>
              <Image
                src={"/not-found.png"}
                alt="No skills found"
                height={100}
                width={100}
              />
              <p className="mt-2">
                No skills found. Please add a skill to get started.
              </p>
            </>
          )
        )}
      </section>
    );
  } else {
    content = (
      <>
        <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-h-[60vh]">
          {items.map((skill) => (
            <SkillCapsuleCard key={skill.id} skill={skill} />
          ))}
        </article>

        <article className="text-center flex justify-between mt-6 w-full">
          <p className="text-gray-text-weak">
            Showing {start} to {end} of {totalItems || items.length} entries
          </p>
          <Pagination
            handleNext={handleNext}
            handlePaginationBtnClick={handlePaginationBtnClick}
            handlePrev={handlePrev}
            nextDisabled={nextDisabled}
            prevDisabled={prevDisabled}
            totalPages={totalPages}
            activePage={currentPageZeroBased + 1}
          />
        </article>
      </>
    );
  }

  return <>{content}</>;
};
