"use client";
import React, { useState } from "react";
import { Eye, Pencil, Trash2, MoreHorizontal, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Table({
  columns = [],
  data = [],
  actions = [],
  pageSize = 10,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, data.length);

  const renderStatus = (status) => {
    let colorClass = "bg-slate-200 text-slate-800";
    if (status === "Verified") colorClass = "bg-emerald-100 text-emerald-800";
    else if (status === "Pending") colorClass = "bg-yellow-100 text-yellow-800";
    else if (status === "Suspended") colorClass = "bg-red-100 text-red-700";

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass} uppercase`}
      >
        {status}
      </span>
    );
  };

  const renderMissing = () => (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100/50 text-slate-500 border border-amber-500">
      <AlertCircle size={12} className="text-amber-500" />
      <span className="text-amber-500">Missing</span>
    </div>
  );

  return (
    <div className="pt-8">
      <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-white via-slate-50/60 to-white border border-slate-200 shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-green-300/40 via-green-200/40 to-green-300/40 text-left">
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className="px-6 py-3 text-[13px] font-semibold text-slate-700 uppercase tracking-wide border-b border-slate-200"
                    style={{
                      width: col.size || "auto",
                      minWidth: col.size || "auto",
                    }}
                  >
                    <div className="inline-flex items-center gap-1">
                      {col.icon && <col.icon size={16} />}
                      {col.header}
                    </div>
                  </th>
                ))}
                {actions.length > 0 && (
                  <th className="px-6 py-3 text-[13px] font-semibold text-slate-700 uppercase tracking-wide border-b border-slate-200 text-right sticky right-0 bg-gradient-to-r from-green-300/40 via-green-200/40 to-green-300/40 backdrop-blur-sm z-20">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="transition-all duration-300 border-b border-slate-200 bg-white hover:shadow-lg"
                  >
                    {columns.map((col, colIndex) => {
                      const value =
                        typeof col.render === "function"
                          ? col.render(row)
                          : row[col.accessor];

                      return (
                        <td
                          key={colIndex}
                          className="px-6 py-4 text-[15px] text-slate-700 font-medium"
                          style={{
                            width: col.size || "auto",
                            minWidth: col.size || "auto",
                          }}
                        >
                          {col.accessor === "status"
                            ? renderStatus(value)
                            : value === null ||
                              value === undefined ||
                              value === "" ||
                              (Array.isArray(value) && value.length === 0)
                            ? renderMissing()
                            : value}
                        </td>
                      );
                    })}

                    {actions.length > 0 && (
                      <td className="px-6 py-3 text-right sticky right-0 bg-white z-10">
                        <div className="inline-flex items-center gap-2 justify-end">
                          <TooltipProvider>
                            {actions.length > 3 ? (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-100 hover:scale-105 transition-all duration-200">
                                    <MoreHorizontal size={16} />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="bg-white rounded-xl shadow-lg border border-slate-200 p-1"
                                >
                                  {actions.map((action, i) => (
                                    <DropdownMenuItem
                                      key={i}
                                      onClick={() => action.onClick?.(row)}
                                      className="flex items-center gap-2 cursor-pointer text-[14px] py-2 px-3 rounded-lg transition-all hover:bg-slate-100"
                                    >
                                      {action.icon && (
                                        <action.icon
                                          size={15}
                                          className="text-green-600"
                                        />
                                      )}
                                      {action.label}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            ) : (
                              actions.map((action, i) => {
                                const Icon =
                                  action.icon ||
                                  (action.label === "View"
                                    ? Eye
                                    : action.label === "Edit"
                                    ? Pencil
                                    : Trash2);

                                const colorClass =
                                  action.color === "red"
                                    ? "text-red-500 hover:bg-red-50"
                                    : action.color === "green"
                                    ? "text-emerald-600 hover:bg-green-50"
                                    : action.color === "blue"
                                    ? "text-blue-600 hover:bg-blue-50"
                                    : action.color === "amber"
                                    ? "text-amber-600 hover:bg-amber-50"
                                    : "text-slate-600 hover:bg-slate-50";

                                return (
                                  <Tooltip key={i}>
                                    <TooltipTrigger asChild>
                                      <button
                                        onClick={() => action.onClick?.(row)}
                                        className={`inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white shadow-sm ${colorClass} hover:scale-105 transition-all duration-200`}
                                      >
                                        <Icon size={16} />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent
                                      side="top"
                                      className="bg-white border border-slate-200 text-slate-700 shadow-lg px-3 py-1.5 rounded-lg text-xs font-medium"
                                    >
                                      {action.label}
                                    </TooltipContent>
                                  </Tooltip>
                                );
                              })
                            )}
                          </TooltipProvider>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                    className="text-center py-8 text-slate-400 text-sm"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-slate-200 bg-white rounded-b-xl shadow-inner">
          <div className="text-sm text-slate-700 font-medium px-3 py-1 bg-slate-100/40 rounded-full">
            Showing {startRecord} to {endRecord} of {data.length} records
          </div>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-green-400 text-white shadow"
                    : "bg-white text-green-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
