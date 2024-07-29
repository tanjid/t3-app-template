import { ShopFormSchema } from "@/components/page-component/shop/shop-form";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const shopRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const results = await ctx.prisma.shop.findMany({
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
    const results = await ctx.prisma.shop.findUnique({
      where: { id: input },
    });
    return results;
  }),

  create: publicProcedure
    .input(ShopFormSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shop.create({ data: { ...input } });
    }),

  update: publicProcedure
    .input(
      ShopFormSchema.extend({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shop.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.shop.delete({
      where: { id: input },
    });
  }),
});
