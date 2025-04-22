import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import { TableHTMLAttributes } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  ArrowUp,
  ArrowDown,
  Eye,
} from "lucide-react";

interface TableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  enableGlobalFilter?: boolean;
  enableSorting?: boolean;
  enableColumnVisibility?: boolean;
  enablePagination?: boolean;
}

export function Table<T>({
  data,
  columns,
  enableGlobalFilter = true,
  enableSorting = true,
  enableColumnVisibility = true,
  enablePagination = true,
  ...rest
}: TableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting,
  });

  return (
    <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
      {enableGlobalFilter && (
        <div className="flex items-center gap-2 p-4 border-b border-gray-200 bg-gray-50">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar..."
            className="w-full max-w-xs border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      )}

      {enableColumnVisibility && (
        <div className="flex flex-wrap gap-3 p-4 border-b border-gray-200 bg-gray-50 text-sm">
          {table.getAllLeafColumns().map((column) => (
            <label key={column.id} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
                className="accent-blue-600"
              />
              <Eye className="w-4 h-4 text-gray-500" />
              {column.columnDef.header?.toString()}
            </label>
          ))}
        </div>
      )}

<table {...rest} className="min-w-full table-auto text-sm text-gray-800  overflow-hidden">
      <thead className="bg-purple-600 text-white uppercase text-xs font-semibold">
      {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={
                    header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  className={`px-4 py-3 text-left ${
                    header.column.getCanSort() ? "cursor-pointer hover:underline" : ""
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc" && (
                      <ArrowUp className="w-4 h-4" />
                    )}
                    {header.column.getIsSorted() === "desc" && (
                      <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-150">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 break-words max-w-xl">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {table.getRowModel().rows.length === 0 && (
        <div className="py-6 text-center text-gray-500">No se encontraron resultados.</div>
      )}

      {enablePagination && (
        <div className="flex items-center justify-between p-4 border-t text-sm bg-gray-50">
          <div className="flex gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-1 rounded border text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-1 rounded border text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-2 py-1 rounded border text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-2 py-1 rounded border text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
          <div className="text-gray-700">
            Página{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </strong>
          </div>
        </div>
      )}
    </div>
  );
}
