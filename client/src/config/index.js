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

export const signInFormData = {
  email: "",
  password: "",
};

export const signInFormInput = [
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
    componentType: "input",
    name: "fullname",
    label: "fullname",
    placeholder: "Enter your full name",
    type: "text",
  },
  {
    componentType: "input",
    name: "email",
    label: "email",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    componentType: "input",
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    type: "password",
  },
  {
    componentType: "input",
    name: "passwordConfirm",
    label: "passwordConfirm",
    placeholder: "Confirm your password",
    type: "password",
  },
];

// sign up form
export const userProfileFormData = {
  fullname: "",
  phone: "",
  location: "",
  profession: "",
  opportunity: "",
  linkCV: "",
};
export const userProfileFormInput = [
  {
    componentType: "input",
    name: "fullname",
    label: "fullname",
    placeholder: "",
    type: "text",
  },
  {
    componentType: "input",
    name: "phone",
    label: "Phone",
    placeholder: "",
    type: "text",
  },
  {
    componentType: "input",
    name: "location",
    label: "Location",
    placeholder: "",
    type: "text",
  },
  {
    componentType: "input",
    name: "profession",
    label: "Profession",
    placeholder: "",
    type: "text",
  },
  {
    componentType: "input",
    name: "opportunity",
    label: "Oportunity Looking",
    placeholder: "",
    type: "text",
  },
  {
    componentType: "input",
    name: "linkCV",
    label: "Link CV",
    placeholder: "",
    type: "text",
  },
];

// courses data :

export const courseCategoryList = [
  {
    categoryId: 1,
    courseName: "Machine learning",
  },
];
