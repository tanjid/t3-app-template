import { Loading } from "@/components/common/loading";
import { OrderClient } from "@/components/page-component/order/client";
import { useGetUrlQuery } from "@/hooks/getAndSetQuery";
import { api } from "@/utils/api";
import { type Order_StatusType } from "prisma/generated/zod";

const Employees = () => {
  const getQuery = useGetUrlQuery("status");
  const query = getQuery() as Order_StatusType | undefined;

  const { data, isLoading, isError, error } =
    api.order.getAllByStatus.useQuery(query);

  if (isLoading) return <Loading />;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 md:p-8">
        <OrderClient data={data} />
      </div>
    </div>
  );
};

export default Employees;
