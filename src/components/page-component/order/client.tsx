"use client";
import { Heading } from "@/components/common/heading";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { columns, type OrderListOrderType } from "./columns";

interface props {
  data: OrderListOrderType[];
  isLoading?: boolean;
}
export const OrderClient = ({ data, isLoading }: props) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Order" description="List of all order" />
        {/* <Button
          onClick={() => {
            router.push("/product/products/new");
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <Separator />
      <OrderStatusBadgeList />
      <Separator />
      <div>
        {isLoading && <CustomLoading />}
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUrlQuery, useSetUrlQuery } from "@/hooks/getAndSetQuery";
import { type Order_StatusType } from "prisma/generated/zod";
import { CustomLoading } from "@/components/common/loading";
export const OrderStatusList: Order_StatusType[] = [
  "TO_SHIP",
  "TO_HANDOVER",
  "SHIPPING",
  "DELIVERED",
  "CANCELLATION",
  "RETURN_REFUND",
];
function OrderStatusBadgeList() {
  const setQuery = useSetUrlQuery("status");
  const getQuery = useGetUrlQuery("status");
  const query = getQuery();

  return (
    <Tabs
      defaultValue="account"
      className="w-[400px]"
      onValueChange={(value) => {
        setQuery(value);
      }}
      value={query}
    >
      <TabsList>
        {OrderStatusList.map((status) => (
          <TabsTrigger key={status} value={status}>
            {status}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}
