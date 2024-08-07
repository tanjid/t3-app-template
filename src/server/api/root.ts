import { createTRPCRouter } from "@/server/api/trpc";
import { employeeRouter } from "@/server/api/routers/employee";
import { productRouter } from "./routers/products";
import { shopRouter } from "./routers/shop";
import { orderRouter } from "./routers/order";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  employee: employeeRouter,
  product: productRouter,
  shop: shopRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
