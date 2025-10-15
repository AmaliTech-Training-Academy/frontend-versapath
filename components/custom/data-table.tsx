"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "./pagination";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Status, type User } from "@/lib/types/api";
import clsx from "clsx";
import { UserTableMenu } from "@/app/dashboard/user-management/components/user-table-menu";

// Export the existing user-specific columns so other components can import and reuse them
export const userColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return (
        <div className="font-medium ">
          <Link
            href={`/dashboard/user-management/${row.original.id}`}
            className="text-[14px] text-gray-text-strong font-semibold hover:underline  cursor-pointer"
          >
            {row.original.firstName ?? "N/A"} {row.original.lastName ?? " "}
          </Link>
          <p className="text-[14px] font-normal text-gray-text-weak">
            {row.original.email}
          </p>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.role.toLowerCase()}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={clsx(
          "text-xs border rounded-lg py-1 px-3 w-fit capitalize",
          {
            "bg-brand-primary-fill border-brand-primary-text text-brand-primary-text":
              row.original.status === Status.ACTIVE,
            "bg-gray-fill border-gray-text-strong text-gray-text-strong":
              row.original.status === Status.PENDING,
            "bg-red-fill border-red-text text-red-text":
              row.original.status === Status.INACTIVE,
          }
        )}
      >
        {row.original.status.toLowerCase()}
      </div>
    ),
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => (
      <div className="w-full text-sm text-center">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => (
      <div className="w-fit text-sm text-center justify-self-end">
        <UserTableMenu user={row.original} />
      </div>
    ),
  },
];

interface DataTableBasePagination {
  pageIndex: number;
  pageSize: number;
}

interface DataTableProps<T > {
  readonly data: T[];
  readonly columns: ColumnDef<T>[];
  readonly getRowId?: (row: T) => string;
  readonly pagination: DataTableBasePagination;
  readonly setPaginationAction: (
    newPagination: DataTableBasePagination
  ) => void;
  readonly pageMeta: {
    page: number;
    size: number;
    totalPages: number;
    totalItems?: number;
  };
  readonly allItemsCount?: number;
  readonly filteredItemsCount?: number;
  readonly hasFilters?: boolean;
}

export function DataTable<T>({
  data: initialData,
  columns,
  getRowId,
  pagination,
  setPaginationAction: setPagination,
  pageMeta,
  allItemsCount = 0,
  filteredItemsCount = 0,
  hasFilters = false,
}: DataTableProps<T>) {
  const data = initialData;
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable<T>({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      pagination,
    },
    getRowId:
      getRowId ??
      ((row) => (row as { id?: string | number })?.id?.toString?.() ?? ""),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newPagination = updater(pagination);
        setPagination(newPagination);
      } else {
        setPagination(updater);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),

    // Client-side pagination for filtered results
    manualPagination: true,
    pageCount: Math.max(pageMeta.totalPages ?? 1, 1),
  });

  const currentPageZeroBased = pageMeta.page ?? 0;
  const pageSize = pageMeta.size ?? pagination.pageSize;
  const totalPages = Math.max(pageMeta.totalPages ?? 1, 1);
  const totalItems = pageMeta.totalItems ?? filteredItemsCount;
  const start = data.length ? currentPageZeroBased * pageSize + 1 : 0;
  const end = currentPageZeroBased * pageSize + data.length;

  return (
    <div className="w-full mt-4 space-y-4">
      {/* Table */}
      <div className="overflow-hidden border rounded-lg">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(header.id === "joinDate" && "text-center")}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {start} to {end} of {totalItems} resources
          {hasFilters && allItemsCount > 0 && (
            <> (filtered from {allItemsCount} total)</>
          )}
          .
        </div>
        <Pagination
          nextDisabled={currentPageZeroBased + 1 >= totalPages}
          prevDisabled={currentPageZeroBased <= 0}
          handleNext={() =>
            setPagination({
              ...pagination,
              pageIndex: pagination.pageIndex + 1,
            })
          }
          handlePrev={() =>
            setPagination({
              ...pagination,
              pageIndex: Math.max(pagination.pageIndex - 1, 0),
            })
          }
          activePage={currentPageZeroBased + 1}
          totalPages={totalPages}
          handlePaginationBtnClick={(val) =>
            setPagination({
              ...pagination,
              pageIndex: Math.max(val - 1, 0),
            })
          }
        />
      </div>
    </div>
  );
}
