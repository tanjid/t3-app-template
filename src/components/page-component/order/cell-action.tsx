"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { AlertModal } from "@/components/common/alert-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { type Order } from "@prisma/client";
import { Pencil } from "lucide-react";
import { OrderStatusList } from "./client";

interface CellActionProps {
  data: Order;
}

export function CellAction({ data }: CellActionProps) {
  const router = useRouter();
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  const { refetch } = api.product.getAll.useQuery(undefined, {
    enabled: false,
  });

  const { mutate: deleteEmployee, isLoading: deleteEmployeeIsLoading } =
    api.product.delete.useMutation({
      onError: (err) => {
        toast.error(err.message);
      },
      onSuccess: async (data) => {
        toast.success("Delete Product success");
        await refetch();
      },
    });

  return (
    <div className="flex justify-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-secondary"
              onClick={() => {
                router.push(`/product/products/${data.id}`);
              }}
            >
              <Pencil className="h-4 w-4 text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Update employee</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpdateOrderStatus data={data} />

      <AlertModal
        title="Are you sure?"
        description="This action cannot be undone."
        name={data.invoiceNumber}
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={() => deleteEmployee(data.id)}
        loading={deleteEmployeeIsLoading}
      />
    </div>
  );
}
function UpdateOrderStatus({ data }: CellActionProps) {
  const utils = api.useUtils();
  const updateOrderStatusMutation = api.order.updateOrderStatus.useMutation({
    onSuccess() {
      void utils.order.invalidate();
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="hover:bg-secondary">
          Update Status
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {OrderStatusList.map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => {
              void toast.promise(
                updateOrderStatusMutation.mutateAsync({
                  orderId: data.id,
                  status: status,
                }),
                {
                  loading: "Updating...",
                  success: "Update success",
                  error: "Update failed",
                }
              );
            }}
          >
            <DropdownMenuLabel>{status}</DropdownMenuLabel>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
