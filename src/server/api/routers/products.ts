import { z } from "zod";
import { format } from "date-fns";
import {
  employeeFormSchema,
  type EmployeeColumn,
  updateEmployeeFormSchema,
} from "@/lib/validators";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ProductFormSchema } from "@/components/page-component/product/product-form";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const results = await ctx.prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // const formattedEmployee: EmployeeColumn[] = employee.map((item) => ({
    //   id: item.id,
    //   firstName: item.firstName,
    //   lastName: item.lastName,
    //   gender: item.gender,
    //   createAt: format(item.createAt, "MMMM do, yyyy"),
    //   updateAt: format(item.updateAt, "MMMM do, yyyy"),
    // }));
    return results;
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const results = await ctx.prisma.product.findUnique({
      where: { id: input },
    });
    return results;
  }),

  create: publicProcedure
    .input(ProductFormSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.create({ data: { ...input } });
    }),

  update: publicProcedure
    .input(
      ProductFormSchema.extend({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.product.delete({
      where: { id: input },
    });
  }),
});
