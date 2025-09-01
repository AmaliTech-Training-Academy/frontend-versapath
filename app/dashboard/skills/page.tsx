"use client";
import React from "react";
import { SkillCapsuleCard } from "./components/skill-capsule-card";
import { Pagination } from "@/components/custom/pagination";

function SkillCapsulePage() {
  return (
    <section>
      <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 12 }, () => crypto.randomUUID()).map((id) => (
          <SkillCapsuleCard key={id} />
        ))}
      </article>
      <article className="text-center flex justify-between  mt-6 w-full  ">
        <p className="text-gray-text-weak">Showing 1 to 6 of 60 entries</p>
        <Pagination
          handleNext={() => {}}
          handlePaginationBtnClick={() => {}}
          handlePrev={() => {}}
          nextDisabled
          prevDisabled
          totalPages={10}
          activePage={1}
        />
      </article>
    </section>
  );
}

export default SkillCapsulePage;
