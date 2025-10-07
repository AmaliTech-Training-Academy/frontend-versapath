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
import { useEffect, useState } from "react";
import { Cluster } from "@/lib/types/api";
import { apiRequest } from "@/lib/api/api-request";
import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { toast } from "sonner";
import { EditCategoryForm } from "./edit-category-form";
import { SheetWrapper } from "@/app/dashboard/components/sheet-wrapper";

export const CategoryList = () => {
  const [query, setQuery] = useListQuery();
  const [categories, setCategories] = useState<Cluster[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    import("@/lib/types/api").Cluster | null
  >(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const {
    items = [],
    pageInfo,
    reload,
  } = useClusters({
    pageIndex: query.page,
    pageSize: query.size,
    name: query.name,
  });

  useEffect(() => {
    if (items && items.length > 0) {
      setCategories(items);
    }
  }, [items]);

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

  const hasData = categories && categories.length > 0;
  const containerClass = clsx("flex flex-col gap-4 w-[823px]");

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      const res = await apiRequest(`/clusters/${deleteId}`, "DELETE");
      if (!res.success) throw new Error("Failed to delete category");
      setCategories((prev) => prev.filter((cat) => cat.id !== deleteId));
      toast.success("Category deleted successfully");
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting");
    } finally {
      setDeleteLoading(false);
    }
  };

  const openEditForm = (category: import("@/lib/types/api").Cluster) => {
    setSelectedCategory(category);
  };

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

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full">
          <thead className="bg-gray-stroke-weak px-4 text-md font-medium text-gray-text-weak">
            <tr>
              <th className="px-4 py-2 text-left">Category Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-base-light-white divide-y divide-gray-stroke-weak py-2">
            {hasData ? (
              categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-2 font-medium text-gray-text-weak whitespace-nowrap">
                    {category.name}
                  </td>
                  <td className="px-4 py-2 text-gray-700 whitespace-pre-line">
                    {category.description}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <SheetWrapper
                      headerTitle="Edit Category"
                      headerDescription="Update category name or description"
                      trigger={
                        <button className="inline-flex" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                      }
                    >
                      <EditCategoryForm
                        cluster={category}
                        revalidateAction={reload}
                      />
                    </SheetWrapper>
                    <button
                      className="inline-flex items-center p-1 text-destructive hover:text-destructive/80 ml-2"
                      title="Delete"
                      onClick={() => setDeleteId(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {/* Delete Confirmation Dialog */}
                    <ConfirmDialog
                      open={!!deleteId}
                      title="Delete Category"
                      description="Are you sure you want to delete this category? This action cannot be undone."
                      confirmLabel="Delete"
                      destructive
                      loading={deleteLoading}
                      onConfirm={handleDelete}
                      onClose={() => {
                        setDeleteId(null);
                        setDeleteLoading(false);
                      }}
                      dialogClose
                    />
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
