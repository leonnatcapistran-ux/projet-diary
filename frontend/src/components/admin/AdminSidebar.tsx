import { useNavigate } from 'react-router-dom';
import { Link, usePage } from '../../lib/inertia-shim';
import DiaryLogo from '../Logo';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users as UsersIcon,
  Star,
  MessageSquare,
  Bell,
  Newspaper,
  Settings,
  LogOut,
  Package2,
} from "lucide-react";

const navSections = [
  {
    label: "Vue generale",
    items: [{ title: "Tableau de bord", path: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Catalogue",
    items: [
      { title: "Produits", path: "/admin/produits", icon: Package },
      { title: "Categories Articles",  path: "/admin/categories",  icon: Package2 },
      { title: "Articles", path: "/admin/articles", icon: Newspaper },
    ]
  },
  {
    label: "Transactions",
    items: [{ title: "Commandes", path: "/admin/commandes", icon: ShoppingCart, badge: undefined as number | undefined }],
  },
  {
    label: "Communaute",
    items: [
      { title: "Clients", path: "/admin/clients", icon: UsersIcon },
      { title: "Avis", path: "/admin/avis", icon: Star, badge: undefined as number | undefined },
      { title: "Messages", path: "/admin/messages", icon: MessageSquare, badge: undefined as number | undefined },
    ],
  },
  {
    label: "Systeme",
    items: [
      { title: "Notifications", path: "/admin/notifications", icon: Bell, badge: undefined as number | undefined },
      { title: "Parametres", path: "/admin/parametres", icon: Settings },
    ],
  },
];

type AdminCounts = {
  commandes?: number;
  avis?: number;
  messages?: number;
  notifications?: number;
};

const AdminSidebar = () => {
  const page = usePage<{ adminCounts?: AdminCounts }>();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { adminCounts } = page.props;
  const currentPath = (() => {
    const rawUrl = page.url || "/";
    const pathname = rawUrl.split("?")[0];
    return pathname || "/";
  })();

  const isActive = (path: string) => {
    if (path === "/admin") return currentPath === "/admin";
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("La déconnexion a échoué.", error);
    }
  };

  const navSectionsWithCounts = navSections.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      if (item.title === "Commandes") {
        return {
          ...item,
          badge: adminCounts?.commandes && adminCounts.commandes > 0 ? adminCounts.commandes : undefined,
        };
      }

      if (item.title === "Avis") {
        return {
          ...item,
          badge: adminCounts?.avis && adminCounts.avis > 0 ? adminCounts.avis : undefined,
        };
      }

      if (item.title === "Messages") {
        return {
          ...item,
          badge: adminCounts?.messages && adminCounts.messages > 0 ? adminCounts.messages : undefined,
        };
      }

      if (item.title === "Notifications") {
        return {
          ...item,
          badge: adminCounts?.notifications && adminCounts.notifications > 0 ? adminCounts.notifications : undefined,
        };
      }

      return item;
    }),
  }));

  return (
    <div className="admin-sidebar">
      <div className="border-b border-sidebar-border px-5 py-5">
        <div className="flex flex-col gap-2">
          <DiaryLogo iconClassName="h-9 w-9" className="[&>span]:text-xs" />
          <div className="pl-1 text-[10px] uppercase tracking-widest text-sidebar-foreground opacity-60">
            Administration
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {navSectionsWithCounts.map((section) => (
          <div key={section.label}>
            <div
              className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: "hsl(var(--sidebar-section))" }}
            >
              {section.label}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-gold/30 font-medium text-gold/90"
                        : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
                    }`}>
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{item.title}</span>
                    {item.badge ? (
                      <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brick text-[10px] font-bold text-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/50 text-xs font-bold text-primary-foreground">
              AD
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-sidebar-accent-foreground">Admin Principal</div>
              <div className="text-[11px] text-sidebar-foreground opacity-60">Super Admin</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-sidebar-accent/10 text-sidebar-foreground hover:text-sidebar-accent-foreground"
            title="Se déconnecter">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
