"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Businesses = {
  name: string;
  logo: string;
  licenses: number;
  earnings: number;
};

export const columns: ColumnDef<Businesses>[] = [
  // {
  // accessorKey: "logo",
  // header: "",
  // cell: ({ row }) => {
  //   const business = row.original;
  //
  //   return (
  //     <div className={"relative h-8 w-20"}>
  //       <Image
  //         src={business.logo}
  //         alt={business.name}
  //         className=" object-fill"
  //         fill
  //       />
  //     </div>
  //   );
  // },
  // },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const business = row.original;
      return (
        <div className="flex gap-4 items-center">
          {" "}
          <div className={"relative h-8 w-20"}>
            <Image
              src={business.logo}
              alt={business.name}
              className=" object-fill"
              fill
            />
          </div>
          <div>{business.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "licenses",
    // header: () => <div className="text-center">Licenses</div>,
    header: ({ column }) => {
      return (
        <div className={"text-center "}>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Licenses
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const business = row.original;
      return <div className="text-center">{business.licenses}</div>;
    },
  },
  {
    accessorKey: "earnings",
    header: "Earnings",
    cell: ({ row }) => {
      const business = row.original;
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(business.earnings);

      return <div className="">{formatted}</div>;
    },
  },
];
