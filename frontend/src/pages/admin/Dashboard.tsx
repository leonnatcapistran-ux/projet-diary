import "../../css/fontCss.css";
import { Link, usePage } from '../../lib/inertia-shim';
import {
  AlertCircle,
  DollarSign,
  MessageSquare,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminTopbar from "@/components/admin/AdminTopbar";

type DashboardStats = {
  orders_today: number;
  monthly_revenue: number;
  active_clients: number;
  pending_total: number;
  pending_reviews: number;
  pending_messages: number;
  pending_orders: number;
};

type MonthlyChartItem = {
  month: string;
  revenue: number;
};

type RecentOrder = {
  id: number;
  client_name: string;
  client_country: string;
  product_name: string;
  origin: string;
  total: number;
  shipping_mode: string;
  status: string;
};

type DashboardPageProps = {
  stats: DashboardStats;
  chartData: {
    monthly: MonthlyChartItem[];
  };
  recentOrders: RecentOrder[];
};

const normalizeStatus = (status: string) => {
  switch (status) {
    case "confirmee":
      return "confirmee";
    case "preparation":
    case "en preparation":
      return "preparation";
    case "expediee":
      return "expediee";
    case "livree":
      return "livree";
    case "annulee":
      return "annulee";
    default:
      return status;
  }
};

const statusLabels: Record<string, string> = {
  en_attente: "En attente",
  confirmee: "Confirmee",
  preparation: "Preparation",
  expediee: "Expediee",
  en_transit: "En transit",
  livree: "Livree",
  annulee: "Annulee",
};

const statusColors: Record<string, string> = {
  en_attente: "bg-status-pending-bg text-status-pending",
  confirmee: "bg-status-pending-bg text-status-pending",
  preparation: "bg-status-pending-bg text-status-pending",
  expediee: "bg-status-shipped-bg text-status-shipped",
  en_transit: "bg-status-shipped-bg text-status-shipped",
  livree: "bg-status-delivered-bg text-status-delivered",
  annulee: "bg-status-cancelled-bg text-status-cancelled",
};

const formatOrigin = (origin: string) => (origin === "MDG" ? "MADAGASCAR" : origin);

const DashboardPage = () => {
  const { stats, chartData, recentOrders } = usePage<DashboardPageProps>().props;

  const kpis = [
    { label: "Commandes aujourd'hui", value: stats.orders_today.toString(), icon: ShoppingCart },
    { label: "CA du mois", value: `${stats.monthly_revenue.toFixed(2)} EUR`, icon: DollarSign },
    { label: "Clients actifs", value: stats.active_clients.toString(), icon: Users },
    {
      label: "Elements en attente",
      value: stats.pending_total.toString(),
      sub: `${stats.pending_orders} commandes + ${stats.pending_messages} messages + ${stats.pending_reviews} avis`,
      icon: AlertCircle,
    },
  ];

  const alerts = [
    {
      text: `${stats.pending_orders} commandes en attente de validation`,
      visible: stats.pending_orders > 0,
      icon: ShoppingCart,
    },
    {
      text: `${stats.pending_messages} messages non lus`,
      visible: stats.pending_messages > 0,
      icon: MessageSquare,
    },
    {
      text: `${stats.pending_reviews} avis en attente de moderation`,
      visible: stats.pending_reviews > 0,
      icon: Star,
    },
  ].filter((alert) => alert.visible);

  return (
    <AdminLayout>
      <AdminTopbar title="Tableau de bord" />

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="kpi-card">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest/10">
                <kpi.icon className="h-5 w-5 text-gold" />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{kpi.sub || kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert.text} className="alert-block border-amber-400/40 bg-amber-200/20">
              <alert.icon className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="text-sm font-medium">{alert.text}</span>
            </div>
          ))
        ) : (
          <div className="alert-block border-gold bg-gold/30">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="text-sm font-medium">Aucune action urgente pour le moment.</span>
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="kpi-card">
          <h3 className="mb-2 font-display font-semibold">Chiffre d'affaires total - 6 derniers mois</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Vue simplifiee du chiffre d'affaires mensuel pour suivre la tendance generale.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => (typeof value === "number" ? `${value.toFixed(2)} EUR` : "")} />
              <Legend />
              <Bar dataKey="revenue" name="CA total" fill="hsl(152, 45%, 38%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="kpi-card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display font-semibold">Dernieres commandes</h3>
          <Link href="/admin/commandes" className="text-sm font-medium text-primary hover:underline">
            Voir toutes -&gt;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">No</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Client</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Produit</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Origine</th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">Montant</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Transport</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => {
                const normalizedStatus = normalizeStatus(order.status);

                return (
                  <tr key={order.id} className="table-row-hover border-b last:border-0">
                    <td className="px-3 py-2.5 font-mono text-xs">#{order.id}</td>
                    <td className="px-3 py-2.5">
                      <div>{order.client_name}</div>
                      <div className="text-xs text-muted-foreground">{order.client_country}</div>
                    </td>
                    <td className="px-3 py-2.5">{order.product_name}</td>
                    <td className="px-3 py-2.5">
                      <span className="status-badge bg-primary/10 text-primary">
                      {formatOrigin(order.origin)}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right font-medium">{order.total.toFixed(2)} EUR</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{order.shipping_mode}</td>
                    <td className="px-3 py-2.5">
                      <span className={`status-badge ${statusColors[normalizedStatus] || ""}`}>
                        {statusLabels[normalizedStatus] ?? normalizedStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    Aucune commande enregistree pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
