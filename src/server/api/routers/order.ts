import { z } from "zod";
import { format } from "date-fns";
import {
  employeeFormSchema,
  type EmployeeColumn,
  updateEmployeeFormSchema,
} from "@/lib/validators";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { NewOrderFormSchema } from "@/components/page-component/order/new-order";
import { Order_StatusSchema } from "prisma/generated/zod";

export const orderRouter = createTRPCRouter({
  updateOrderStatus: publicProcedure
    .input(z.object({ orderId: z.string(), status: Order_StatusSchema }))
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.update({
        where: { id: input.orderId },
        data: {
          status: input.status,
        },
      });

      return order;
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.order.findMany({
      include: {
        OrderItems: {
          include: {
            product: true,
          },
        },
        shop: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res;
  }),
  getAllByStatus: publicProcedure

    .input(Order_StatusSchema.optional())

    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.order.findMany({
        include: {
          OrderItems: {
            include: {
              product: true,
            },
          },
          shop: true,
        },
        where: {
          status: input,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res;
    }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const res = await ctx.prisma.order.findUnique({
      where: { id: input },
      include: {
        OrderItems: {
          include: {
            product: true,
          },
        },
        shop: true,
      },
    });
    return res;
  }),

  create: publicProcedure
    .input(NewOrderFormSchema)
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.create({
        data: {
          invoiceNumber: input.invoiceNumber,
          totalAmount: input.totalAmount,

          shop: {
            connect: {
              id: input.shopId,
            },
          },

          OrderItems: {
            create: input.OrderItems.map((item) => ({
              price: item.price,
              qty: item.qty,

              product: {
                connect: {
                  id: item.product.id,
                },
              },
            })),
          },
        },
      });

      return order;
    }),

  update: publicProcedure
    .input(updateEmployeeFormSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.employee.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.employee.delete({
      where: { id: input },
    });
  }),
});
