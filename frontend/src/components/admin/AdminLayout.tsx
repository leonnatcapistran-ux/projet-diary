import type { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      <AdminSidebar/>
      <div className="admin-content flex-1 p-6">{children}</div>
    </div>
  );
};

export default AdminLayout;
