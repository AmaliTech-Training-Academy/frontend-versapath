"use client";

import { EmptyState } from "@/components/custom/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit } from "lucide-react";
import { AddCategoryForm } from "./add-category-form";
import clsx from "clsx";
import { Pagination } from "@/components/custom/pagination";
import { paginationCalculator } from "@/lib/hooks/pagination-calculator";
import { useClusters } from "@/lib/api/clusters";
import { useListQuery } from "@/lib/hooks/use-list-query";
import { useEffect } from "react";
import { SheetWrapper } from "../../components/sheet-wrapper";

export const CategoryList = () => {
  const [query, setQuery] = useListQuery();

  const { items = [], pageInfo } = useClusters({
    pageIndex: query.page,
    pageSize: query.size,
    name: query.name,
  });

  useEffect(() => {
    if (!pageInfo) return;
    const serverPage = Math.max(0, pageInfo.page ?? query.page);
    const serverSize = Math.max(1, pageInfo.size ?? query.size);
    if (serverPage !== query.page || serverSize !== query.size) {
      setQuery({ page: serverPage, size: serverSize });
    }
  }, [pageInfo, query.page, query.size, setQuery]);

  const {
    currentPage,
    totalPages,
    totalItems,
    start,
    end,
    prevDisabled,
    nextDisabled,
  } = paginationCalculator({
    items,
    pageInfo,
    pagination: {
      pageIndex: query.page,
      pageSize: query.size,
    },
  });

  const hasData = items && items.length > 0;
  const containerClass = clsx("flex flex-col gap-4 w-[823px]");

  return (
    <section className={containerClass}>
      <h2 className="text-lg font-semibold">Manage Skill Categories</h2>

      <div className="flex justify-between md:flex-row gap-2 w-full md:w-auto">
        <Input
          placeholder="Search categories..."
          className="md:w-64 lg:w-84"
          value={query.name || ""}
          onChange={(e) => setQuery({ name: e.target.value, page: 0 })}
        />
        <SheetWrapper
          headerTitle="Add New Category"
          headerDescription="Add a new skill category to organize your tags"
          trigger={
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Category
            </Button>
          }
        >
          <AddCategoryForm revalidateAction={() => {}} />
        </SheetWrapper>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full">
          <thead className="bg-gray-stroke-weak px-4 text-md font-medium text-gray-text-weak">
            <tr>
              <th className="px-4 py-2 text-left ">Category Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-center ">Action</th>
            </tr>
          </thead>
          <tbody className="bg-base-light-white divide-y divide-gray-stroke-weak py-2">
            {hasData ? (
              items.map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-2 font-medium text-gray-text-weak whitespace-nowrap">
                    {category.name}
                  </td>
                  <td className="px-4 py-2 text-gray-700 whitespace-pre-line">
                    {category.description}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button className="inline-flex" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="inline-flex items-center p-1 text-destructive hover:text-destructive/80 ml-2"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center">
                  <EmptyState message="No skill categories found." />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 md:flex-row mt-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {start} to {end} {totalItems > end && <> of {totalItems}</>}{" "}
          Categories
        </div>
        <Pagination
          nextDisabled={!nextDisabled}
          prevDisabled={!prevDisabled}
          handleNext={() => setQuery({ page: query.page + 1 })}
          handlePrev={() => setQuery({ page: Math.max(query.page - 1, 0) })}
          activePage={currentPage + 1}
          totalPages={totalPages}
          handlePaginationBtnClick={(val) => setQuery({ page: val })}
        />
      </div>
    </section>
  );
};
