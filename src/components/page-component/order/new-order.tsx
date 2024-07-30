import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import { api, RouterOutputs } from "@/utils/api";
import { Product, Shop } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
export type OrderType = RouterOutputs["order"]["getById"];
export const NewOrderFormSchema = OrderOptionalDefaultsSchema.extend({
  OrderItems: z.array(
    OrderItemsOptionalDefaultsSchema.extend({
      product: ProductOptionalDefaultsSchema,
      orderId: z.string().optional(),
    })
  ),
});

export type NewOrderFormType = z.infer<typeof NewOrderFormSchema>;

type OrderItem = {
  id: string;
  product: Product;
  quantity: number;
  price: number;
};
const NewOrderPage = ({ data }: { data?: OrderType }) => {
  const isEditing = !!data?.id;
  const [productList, setProductList] = useState<OrderItem[]>([]);
  const createOrderMutation = api.order.create.useMutation();

  const form = useForm<NewOrderFormType>({
    resolver: zodResolver(NewOrderFormSchema),
    defaultValues: data || {
      OrderItems: [],
    },
  });

  function handleProductAdd(product: OrderItem) {
    // if item is already added don't add
    if (productList.some((item) => item.product.id === product.product.id)) {
      return;
    }
    const newProductList = [...productList, product];
    setProductList((prev) => [...prev, product]);
    calculateTotal(newProductList);
  }

  function handleProductDelete(product: OrderItem) {
    const newProductList = productList.filter(
      (item) => item.product.id !== product.product.id
    );
    setProductList(() =>
      productList.filter((item) => item.product.id !== product.product.id)
    );

    calculateTotal(newProductList);
  }

  function handleQtyChange(product: OrderItem, qty: number) {
    if (qty < 1) {
      return;
    }
    const newProductList = productList.map((item) => {
      if (item.product.id === product.product.id) {
        return {
          ...item,
          quantity: qty,
          price: item.price,
        };
      }
      return item;
    });
    setProductList(() => newProductList);
    calculateTotal(newProductList);
  }

  function handlePriceChange(product: OrderItem, price: number) {
    if (price < 1) {
      return;
    }
    const newProductList = productList.map((item) => {
      if (item.product.id === product.product.id) {
        return {
          ...item,
          price,
        };
      }
      return item;
    });
    setProductList(() => newProductList);
    calculateTotal(newProductList);
  }

  function calculateTotal(list: OrderItem[]) {
    const total = list.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    form.setValue("totalAmount", total);
  }
  // log form errors
  console.log(form.formState.errors);
  function onSubmit(values: NewOrderFormType) {
    if (productList.length < 1) return toast.error("Please add products");

    values.OrderItems = productList.map((item) => ({
      productId: item.product.id,
      qty: item.quantity,

      price: item.price,
      product: item.product,
    }));

    if (isEditing) {
      // api.order.update.mutate({ id: data.id, data: values });
    } else {
      void toast.promise(createOrderMutation.mutateAsync(values), {
        loading: "Creating order...",
        success: "Order created successfully",
        error: "Failed to create order",
      });
    }
  }

  return (
    <Card className="mx-auto max-w-5xl">
      <CardHeader>
        <CardTitle> New Order</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-2">
              <div>
                <SelectShop form={form} />
              </div>
              <div className="w-72">
                <FormField
                  control={form.control}
                  name="invoiceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Number</FormLabel>
                      <FormControl>
                        <Input {...field} className="" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <ProductSearch handleAdd={handleProductAdd} />
            <div className="flex justify-between">
              <div className="basis-3/5">
                {productList.map((item) => (
                  <div
                    key={item.product.id}
                    className="mt-2  flex gap-2  rounded-md border p-2"
                  >
                    <div>
                      <FormLabel>Product</FormLabel>

                      <Input
                        type="text"
                        className="max-w-[100px] "
                        value={item.product.sku}
                        disabled
                      />
                    </div>
                    <div>
                      <FormLabel>Price</FormLabel>
                      <Input
                        type="number"
                        className="max-w-[100px]"
                        value={item.price}
                        onChange={(event) =>
                          handlePriceChange(item, parseInt(event.target.value))
                        }
                      />
                    </div>
                    <div>
                      <FormLabel>Qty</FormLabel>
                      <Input
                        type="number"
                        className="max-w-[60px]"
                        value={item.quantity}
                        onChange={(event) =>
                          handleQtyChange(item, parseInt(event.target.value))
                        }
                      />
                    </div>

                    <Button
                      onClick={() => {
                        handleProductDelete(item);
                      }}
                      size="icon"
                      color=""
                      variant="destructive"
                      className="mt-6 justify-self-end"
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                ))}
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewOrderPage;

function ProductSearch({
  handleAdd,
}: {
  handleAdd: (product: OrderItem) => void;
}) {
  const [debouncedValue, setValue] = useDebounceValue("", 500);
  const searchProductQuery = api.product.search.useQuery(debouncedValue);
  return (
    <Card className="mx-auto max-w-5xl">
      <CardHeader>
        <CardTitle> Search </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Search for products"
          onChange={(event) => setValue(event.target.value)}
        />
        {searchProductQuery.isLoading ? (
          <p>Loading...</p>
        ) : searchProductQuery.error ? (
          <p>Error: {searchProductQuery.error.message}</p>
        ) : searchProductQuery.data ? (
          <div className="flex gap-2 ">
            {searchProductQuery.data.map((product) => (
              <ProductsSearchResultCard
                key={product.id}
                product={product}
                handleAdd={handleAdd}
              />
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function ProductsSearchResultCard({
  product,
  handleAdd,
}: {
  product: Product;
  handleAdd: (product: OrderItem) => void;
}) {
  return (
    <Card
      onClick={() => {
        handleAdd({
          product,
          quantity: 1,
          id: product.id,
          price: product.salePrice,
        });
      }}
    >
      <CardHeader>
        <CardTitle> {product.sku} </CardTitle>
      </CardHeader>
      <CardContent>
        <p> {product.name} </p>
      </CardContent>
    </Card>
  );
}

import {
  OrderItemsOptionalDefaultsSchema,
  OrderOptionalDefaultsSchema,
  ProductOptionalDefaultsSchema,
} from "prisma/generated/zod";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { Delete, DeleteIcon } from "lucide-react";
function SelectShop({ form }: { form: UseFormReturn<NewOrderFormType> }) {
  const { data, isLoading } = api.shop.getAll.useQuery();

  return (
    <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
      <FormField
        control={form.control}
        name="shopId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Shop</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Shop" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {isLoading ? (
                  <SelectItem value="Loading">Loading...</SelectItem>
                ) : data ? (
                  data.map((shop) => (
                    <SelectItem key={shop.id} value={shop.id}>
                      {shop.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="v">No shops found</SelectItem>
                )}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
