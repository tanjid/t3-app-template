/* eslint-disable @typescript-eslint/no-misused-promises */
import { Shop } from "@prisma/client";
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
import { ShopOptionalDefaultsSchema } from "prisma/generated/zod";
import toast from "react-hot-toast";
import { type z } from "zod";

interface props {
  initialData: Shop | null | undefined;
}
const NAME = "shop";
export const ShopFormSchema = ShopOptionalDefaultsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type ShopFromValues = z.infer<typeof ShopFormSchema>;
const redirectUrl = "/shop/shops";
export const ShopForm = ({ initialData }: props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? `Edit ${NAME}` : `Create ${NAME}`;
  const description = initialData ? `Edit a ${NAME}` : `Create a new ${NAME}`;
  const toastMessage = initialData
    ? `${NAME} updated successfully`
    : `${NAME} created successfully`;
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<ShopFromValues>({
    resolver: zodResolver(ShopFormSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const { mutate: create } = api.shop.create.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(toastMessage);
      router.push(redirectUrl);
    },
  });

  const { mutate: update } = api.shop.update.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(toastMessage);
      router.push(redirectUrl);
    },
  });

  const { mutate: deleteEmployee, isLoading: deleteEmployeeIsLoading } =
    api.shop.delete.useMutation({
      onError: (err) => {
        toast.error(err.message);
      },
      onSuccess: (data) => {
        toast.success(toastMessage);
        router.push(redirectUrl);
      },
    });

  const onSubmit = (values: ShopFromValues) => {
    setLoading(true);
    if (initialData) {
      update({ ...values, id: initialData.id });
    } else {
      create(values);
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
        formSchema={ShopFormSchema}
        onSubmit={onSubmit}
        values={initialData ?? undefined}
      >
        <AutoFormSubmit>{action}</AutoFormSubmit>
      </AutoForm>

      <AlertModal
        title="Are you sure?"
        description="This action cannot be undone."
        name={initialData?.name}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={deleteEmployeeIsLoading}
      />
    </>
  );
};
