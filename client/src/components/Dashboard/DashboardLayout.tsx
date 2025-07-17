import type { ReactNode } from "react";
import type { UserRole } from "../../types/SidebarTypes";
import Sidebar from "../Sidebar/Sidebar";
import "../../assets/styles/DashboardLayout.css";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: UserRole;
  activeItem: string;
}

const DashboardLayout = ({
  children,
  userRole,
  activeItem,
}: DashboardLayoutProps) => {
  return (
    <div className="dashboard-layout">
      <Sidebar activeItem={activeItem} userRole={userRole} />
      <main className="dashboard-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;
