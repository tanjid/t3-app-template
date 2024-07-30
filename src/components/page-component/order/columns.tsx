"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { type Product } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { RouterOutputs } from "@/utils/api";
export type OrderListOrderType = RouterOutputs["order"]["getAll"][0];

export const columns: ColumnDef<OrderListOrderType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "invoiceNumber",
    header: "invoiceNumber",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Date",

    cell: (value) => (
      <div>
        {new Intl.DateTimeFormat("en-IN").format(
          new Date(value.row.original.createdAt)
        )}
      </div>
    ),
  },

  {
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
