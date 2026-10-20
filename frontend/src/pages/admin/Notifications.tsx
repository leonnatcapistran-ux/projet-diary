import { router } from '../../lib/inertia-shim';
import { Bell, Mail, MessageSquare, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { api } from "@/lib/api";

type NotificationItem = {
  id: string;
  type: "commande" | "message" | "avis";
  title: string;
  message: string;
  date?: string | null;
  link: string;
};

type NotificationsPageProps = {
  notifications: NotificationItem[];
  summary: {
    commandes: number;
    messages: number;
    avis: number;
    total: number;
  };
};

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const iconMap = {
  commande: ShoppingCart,
  message: Mail,
  avis: Star,
};

const NotificationsPage = () => {
  // Autrefois injecté par Inertia::render('admin/Notifications', [...]) ;
  // maintenant récupéré via GET /api/admin/notifications.
  const [data, setData] = useState<NotificationsPageProps | null>(null);

  const load = () => {
    api.get('/api/admin/notifications').then(({ data }) => setData(data));
  };

  useEffect(() => {
    load();
  }, []);

  const handleNotificationClick = (notification: NotificationItem) => {
    // Extract ID from notification.id (e.g., "commande-123" -> 123)
    const id = notification.id.split('-')[1];

    // Mark notification as viewed, puis rafraîchit la liste.
    router
      .post(`/api/admin/notifications/${notification.type}/${id}/mark-viewed`)
      .then(load);
  };

  if (!data) {
    return (
      <AdminLayout>
        <AdminTopbar title="Notifications" />
      </AdminLayout>
    );
  }

  const { notifications, summary } = data;

  return (
    <AdminLayout>
      <AdminTopbar title="Notifications" />

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: "Total", value: summary.total, icon: Bell },
          { label: "Commandes à traiter", value: summary.commandes, icon: ShoppingCart },
          { label: "Messages non lus", value: summary.messages, icon: MessageSquare },
          { label: "Avis en attente", value: summary.avis, icon: Star },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="kpi-card flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="kpi-card">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-foreground">Elements recents à traiter</h2>
          <p className="text-sm text-muted-foreground">
            Cette page centralise les commandes en attente, les messages non lus et les avis à moderer.
          </p>
        </div>

        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const Icon = iconMap[notification.type];

              return (
                <div
                  key={notification.id}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-background px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{notification.title}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{notification.message}</div>
                      <div className="mt-2 text-xs text-muted-foreground">{formatDate(notification.date)}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNotificationClick(notification)}
                    className="rounded-full bg-forest px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-forest/90"
                  >
                    Voir
                  </button>
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
              Aucune notification en attente pour le moment.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default NotificationsPage;
