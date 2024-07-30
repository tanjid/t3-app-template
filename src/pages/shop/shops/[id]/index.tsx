import { CustomLoading } from "@/components/common/loading";
import { ShopForm } from "@/components/page-component/shop/shop-form";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

const Product = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") {
    return <CustomLoading />;
  }

  const { data, isLoading } = api.shop.getById.useQuery(id);
  if (isLoading) {
    return <CustomLoading />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <ShopForm initialData={data} />
      </div>
    </div>
  );
};

export default Product;
