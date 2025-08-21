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
import { SheetWrapper } from "@/app/dashboard/components/sheet-wrapper";

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
          <SheetWrapper
            headerDescription="User details"
            headerTitle={"User information"}
            trigger={
              <p className="text-[14px] text-gray-text-strong font-semibold hover:underline  cursor-pointer">
                {row.original.user}
              </p>
            }
          >
            <div className="space-y-3">
              {Object.entries(row.original)
                .filter((row) => row[0] !== "id")
                .map(([key, value]) => (
                  <div key={key} className="">
                    <p className="font-normal capitalize text-gray-stroke-strong">
                      {key}
                    </p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
            </div>
          </SheetWrapper>
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
  {
    accessorKey: "stack",
    header: "Stack",
    cell: ({ row }) => <div className="font-medium">{row.original.stack}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="text-sm">{row.original.status}</div>,
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => (
      <div className="w-full text-sm text-center">{row.original.joinDate}</div>
    ),
  },
];

export function DataTable({ data: initialData }: { data: User[] }) {
  const [data] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

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
