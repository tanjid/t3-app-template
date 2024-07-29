"use client";
import { Heading } from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Separator } from "@/components/ui/separator";
import { type Product } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

interface props {
  data: Product[];
}
export const ProductClient = ({ data }: props) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Products"
          description="Manage employee for you business"
        />
        <Button
          onClick={() => {
            router.push("/product/products/new");
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};
