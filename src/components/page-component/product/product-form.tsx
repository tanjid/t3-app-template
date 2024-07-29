/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import AutoForm, { AutoFormSubmit } from "@/components/auto-form";
import { AlertModal } from "@/components/common/alert-modal";
import { Heading } from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { ProductOptionalDefaultsSchema } from "prisma/generated/zod";
import toast from "react-hot-toast";
import { type z } from "zod";

interface ProductFormProps {
  initialData: Product | null | undefined;
}

export const ProductFormSchema = ProductOptionalDefaultsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type ProductFromValues = z.infer<typeof ProductFormSchema>;
export const ProductForm = ({ initialData }: ProductFormProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit employee" : "Create employee";
  const description = initialData ? "Edit a employee" : "Create a new employee";
  const toastMessage = initialData
    ? "Employee updated successfully"
    : "Employee created successfully";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<ProductFromValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const { mutate: createEmployee } = api.product.create.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(toastMessage);
      router.push(`/product/products`);
    },
  });

  const { mutate: updateEmployee } = api.product.update.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(toastMessage);
      router.push(`/product/products`);
    },
  });

  const { mutate: deleteEmployee, isLoading: deleteEmployeeIsLoading } =
    api.product.delete.useMutation({
      onError: (err) => {
        toast.error(err.message);
      },
      onSuccess: (data) => {
        toast.success(toastMessage);
        router.push(`/product/products`);
      },
    });

  const onSubmit = (values: ProductFromValues) => {
    setLoading(true);
    if (initialData) {
      updateEmployee({ ...values, id: initialData.id });
    } else {
      createEmployee(values);
    }
    setLoading(false);
  };

  const onDelete = () => {
    deleteEmployee(initialData?.id as string);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <AutoForm
        formSchema={ProductFormSchema}
        onSubmit={onSubmit}
        values={initialData ?? undefined}
      >
        <AutoFormSubmit>{action}</AutoFormSubmit>
      </AutoForm>

      <AlertModal
        title="Are you sure?"
        description="This action cannot be undone."
        name={initialData?.sku}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={deleteEmployeeIsLoading}
      />
    </>
  );
};
