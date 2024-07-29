import { Loading } from "@/components/common/loading";
import { EmployeeForm } from "@/components/page-component/example/employee/employee-form";
import { ProductForm } from "@/components/page-component/product/product-form";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";

const Product = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") {
    return <Loading />;
  }

  const { data: product, isLoading } = api.product.getById.useQuery(id);
  console.log("🚀 ~ Product ~ product:", product);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <ProductForm initialData={product} />
      </div>
    </div>
  );
};

export default Product;
