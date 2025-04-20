import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnDef,
  } from "@tanstack/react-table";
  import { TableHTMLAttributes } from "react";
  
  interface TableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
    data: T[];
    columns: ColumnDef<T, unknown>[];
}
  
  export function Table<T>({ data, columns, ...rest }: TableProps<T>) {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
  
    return (
      <div className="overflow-x-auto">
        <table
          {...rest}
          className="min-w-full text-sm text-gray-700 border bg-white shadow-md rounded-md table-auto"
        >
          <thead className="bg-blue-100 text-blue-800 uppercase text-xs font-semibold">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
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
      </div>
    );
  }
  