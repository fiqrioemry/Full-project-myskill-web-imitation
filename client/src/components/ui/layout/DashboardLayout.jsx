import Header from "./Header";
import { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useGlobal } from "../../../context/GlobalProvider";

// eslint-disable-next-line react/prop-types
const DashboardLayout = () => {
  const { currentPath } = useGlobal();

  if (currentPath === "/dashboard")
    return <Navigate to="/dashboard/my-profile" />;

  return (
    <Fragment>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full ">
          <Header />
          <Outlet />
        </main>
      </SidebarProvider>
    </Fragment>
  );
};

export default DashboardLayout;
