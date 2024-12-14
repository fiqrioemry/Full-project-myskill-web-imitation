import { UserRound, ShoppingBag, History, FileText } from "lucide-react";

export const nonAuthPath = ["/sign-in", "/sign-up"];

export const authPath = [
  "/dashboard",
  "/dashboard/my-profile",
  "/dashboard/my-purchase",
  "/dashboard/my-activity",
  "/dashboard/my-transaction",
];

export const prohibitPath = [
  "/admin",
  "/admin/setting",
  "/admin/course/add",
  "/admin/course/detail/:id",
];

export const sidebarNavItem = [
  {
    title: "my-profile",
    url: "/dashboard/my-profile",
    icon: UserRound,
  },
  {
    title: "Purchasement",
    url: "/dashboard/my-purchase",
    icon: ShoppingBag,
  },
  {
    title: "Activities",
    url: "/dashboard/my-activity",
    icon: History,
  },
  {
    title: "Transaction",
    url: "/dashboard/my-transaction",
    icon: FileText,
  },
];
