import type { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import { usePage } from "../../lib/inertia-shim";

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { error, loading } = usePage();

  return (
    <div className="min-h-screen flex">
      <AdminSidebar/>
      <div className="admin-content flex-1 p-6">
        {error && (
          <div role="alert" className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}
        {loading && (
          <p role="status" className="mb-4 text-sm text-muted-foreground">
            Chargement des données…
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
