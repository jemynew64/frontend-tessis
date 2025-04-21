// Table.tsx
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
    getPaginationRowModel: getPaginationRowModel(), // ✅ nuevo
    enableSorting,
  });

  return (
    <div className="overflow-x-auto">
      {/* 🔍 Buscador global */}
      {enableGlobalFilter && (
        <div className="mb-4">
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="🔍 Buscar..."
            className="p-2 border rounded w-full text-sm"
          />
        </div>
      )}

      {/* ✅ Toggle de columnas */}
      {enableColumnVisibility && (
        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          {table.getAllLeafColumns().map((column) => (
            <label key={column.id} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
              {column.columnDef.header?.toString()}
            </label>
          ))}
        </div>
      )}

      <table
        {...rest}
        className="min-w-full text-sm text-gray-700 border bg-white shadow-md rounded-md table-auto"
      >
        <thead className="bg-blue-100 text-blue-800 uppercase text-xs font-semibold">
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
                  className={`px-4 py-2 text-left cursor-pointer select-none ${
                    header.column.getCanSort() ? "hover:underline" : ""
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc" && "🔼"}
                    {header.column.getIsSorted() === "desc" && "🔽"}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* 👉 Mensaje si no hay filas */}
      {table.getRowModel().rows.length === 0 && (
        <p className="text-center text-gray-500 py-6">
          No se encontraron resultados.
        </p>
      )}
      {/* ✅ Paginación */}
      {enablePagination && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              ⏮️
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              Siguiente
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              ⏭️
            </button>
          </div>

          <span className="text-gray-700">
            Página{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </strong>
          </span>
        </div>
      )}
    </div>
  );
}
