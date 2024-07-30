import {
  BookOpenCheck,
  LayoutDashboard,
  ListIcon,
  PackageIcon,
  ScrollIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { type NavItem } from "@/types";

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },

  {
    title: "Products",
    icon: PackageIcon,
    href: "/example",
    color: "text-orange-500",
    isChidren: true,
    children: [
      {
        title: "Product List",
        icon: ListIcon,
        color: "text-red-500",
        href: "/product/products",
      },
    ],
  },
  {
    title: "Shop",
    icon: ShoppingBagIcon,
    href: "/example",
    color: "text-orange-500",
    isChidren: true,
    children: [
      {
        title: "Shop List",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/shop/shops",
      },
    ],
  },
  {
    title: "Order",
    icon: ScrollIcon,
    href: "/example",
    color: "text-orange-500",
    isChidren: true,
    children: [
      {
        title: "Order List",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/order",
      },
      {
        title: "New Order",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/order/new-order",
      },
    ],
  },
];
