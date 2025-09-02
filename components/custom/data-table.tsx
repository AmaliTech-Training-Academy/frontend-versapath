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
import type { User } from "@/lib/types/api";

const columns: ColumnDef<User>[] = [
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
    cell: ({ row }) => <span>{row.original.role}</span>,
  },
  // {
  //   accessorKey: "stack",
  //   header: "Stack",
  //   cell: ({ row }) => <div className="font-medium">{row.original.}</div>,
  // },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="text-sm">{row.original.status}</div>,
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => (
      <div className="w-full text-sm text-center">
        {new Date(row.original.createdAt).toLocaleString()}
      </div>
    ),
  },
];
interface DataTableProps {
  data: User[];
  readonly pagination: { pageIndex: number; pageSize: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
}

export function DataTable({
  data: initialData,
  pagination,
  setPagination,
}: DataTableProps) {

  // const [data] = React.useState(() => initialData);
  const data = initialData;
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

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
                  colSpan={columns.length}
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
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            table.getFilteredRowModel().rows.length,
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize
          )}{" "}
          of {table.getFilteredRowModel().rows.length} resources.
        </div>
        <Pagination
          nextDisabled={!table.getCanNextPage()}
          prevDisabled={!table.getCanPreviousPage()}
          handleNext={() => table.nextPage()}
          handlePrev={() => table.previousPage()}
          activePage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
          handlePaginationBtnClick={(val) =>
            setPagination((prev) => ({ ...prev, pageIndex: val }))
          }
        />
      </div>
    </div>
  );
}
