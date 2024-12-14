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

// sign up form
export const signUpFormData = {
  fullname: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const signUpFormInput = [
  {
    name: "fullname",
    label: "fullname",
    placeholder: "Enter your fullname",
    type: "text",
    componentType: "input",
  },
  {
    name: "email",
    label: "email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password Confirmation",
    placeholder: "Enter your password confirmation",
    type: "password",
    componentType: "input",
  },
];
