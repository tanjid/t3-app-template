import { CustomLoading } from "@/components/common/loading";
import { ShopClient } from "@/components/page-component/shop/client";
import { api } from "@/utils/api";

const Products = () => {
  const { data, isLoading, isError, error } = api.shop.getAll.useQuery();

  if (isLoading) return <CustomLoading />;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 md:p-8">
        <ShopClient data={data} />
      </div>
    </div>
  );
};

export default Products;
