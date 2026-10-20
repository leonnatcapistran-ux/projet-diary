import { router, usePage } from '../../lib/inertia-shim';
import { Search } from "lucide-react";
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const statusChips = ["Toutes", "En attente", "Expediees", "Livrees"];
const selectableStatuses = ["confirmee", "preparation", "expediee", "en_transit", "livree", "annulee"] as const;
type SelectableStatus = typeof selectableStatuses[number];

type OrderStatus = SelectableStatus | "en_attente";

const statusColors: Record<OrderStatus, string> = {
  en_attente: "bg-status-pending-bg text-status-pending",
  confirmee: "bg-status-pending-bg text-status-pending",
  preparation: "bg-status-pending-bg text-status-pending",
  expediee: "bg-status-shipped-bg text-status-shipped",
  en_transit: "bg-status-shipped-bg text-status-shipped",
  livree: "bg-status-delivered-bg text-status-delivered",
  annulee: "bg-status-cancelled-bg text-status-cancelled",
};

const statusLabels: Record<OrderStatus, string> = {
  en_attente: "En attente",
  confirmee: "Confirmee",
  preparation: "Preparation",
  expediee: "Expediee",
  en_transit: "En transit",
  livree: "Livree",
  annulee: "Annulee",
};

type CommandeUser = {
  id_user: number;
  nom?: string;
  prenom?: string;
  email?: string;
};

type CommandeItem = {
  id_commande: number;
  id_user: number | null;
  pays_origine: string;
  statut: OrderStatus | string;
  montant_total: number;
  type_achat: string;
  adresse_livraison: string;
  pays_livraison: string;
  mode_transport: string | null;
  cout_transport: number | null;
  poids_total_kg: number;
  numero_suivi: string | null;
  date_commande?: string;
  date_livraison_estimee?: string | null;
  num_telephone?: string | null;
  email_valide?: string | null;
  user?: CommandeUser;
  lignes?: Array<{
    id_ligne: number;
    id_produit: number;
    quantite_kg: number | string;
    produit?: {
      id_produit: number;
      nom: string;
    } | null;
  }>;
  facture?: {
    numero_facture?: string | null;
    montant_ht?: number | string | null;
    montant_ttc?: number | string | null;
    cout_transport?: number | string | null;
  } | null;
};

type OrdersPageProps = {
  commandes: {
    data: CommandeItem[];
  };
};

const OrdersPage = () => {
  const { commandes } = usePage<OrdersPageProps>().props;
  const orders = commandes?.data ?? [];
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Toutes");
  const [selectedOrder, setSelectedOrder] = useState<CommandeItem | null>(null);
  const [updateStatus, setUpdateStatus] = useState<SelectableStatus>("confirmee");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const normalizeStatus = (status: string): OrderStatus => {
    switch (status) {
      case "confirmee":
      case "confirmation":
        return "confirmee";
      case "preparation":
        return "preparation";
      case "expediee":
        return "expediee";
      case "livree":
        return "livree";
      case "annulee":
        return "annulee";
      default:
        return status as OrderStatus;
    }
  };

  const filtered = orders.filter((order) => {
    const query = search.toLowerCase();
    const clientName = `${order.user?.prenom ?? ""} ${order.user?.nom ?? ""}`.trim().toLowerCase();
    const normalizedStatus = normalizeStatus(order.statut);

    if (search && !`${order.id_commande}`.includes(query) && !clientName.includes(query)) {
      return false;
    }

    if (statusFilter === "En attente" && !["en_attente", "confirmee", "preparation"].includes(normalizedStatus)) {
      return false;
    }

    if (statusFilter === "Expediees" && !["expediee", "en_transit"].includes(normalizedStatus)) {
      return false;
    }

    if (statusFilter === "Livrees" && normalizedStatus !== "livree") {
      return false;
    }

    return true;
  });

  const selectOrder = (order: CommandeItem) => {
    setSelectedOrder(order);
    setUpdateError(null);

    const normalizedStatus = normalizeStatus(order.statut);
    if (normalizedStatus !== "en_attente") {
      setUpdateStatus(normalizedStatus);
    }

    setTrackingNumber(order.numero_suivi ?? "");
    const montantProduits =
      order.facture?.montant_ht !== null && order.facture?.montant_ht !== undefined
        ? Number(order.facture.montant_ht)
        : Number(order.montant_total) - Number(order.cout_transport ?? 0);
    setProductAmount(Number.isFinite(montantProduits) ? String(Math.max(0, montantProduits)) : "");
    setShippingCost(order.cout_transport !== null && order.cout_transport !== undefined ? String(order.cout_transport) : "");
    setDeliveryDate(order.date_livraison_estimee ? order.date_livraison_estimee.split(" ")[0] : "");
  };

  const handleUpdate = () => {
    if (!selectedOrder) {
      return;
    }

    setUpdateError(null);
    setIsUpdating(true);

    router.put(
      `/admin/commandes/${selectedOrder.id_commande}`,
      {
        statut: updateStatus,
        numero_suivi: trackingNumber || null,
        montant_ht: productAmount ? Number(productAmount) : null,
        cout_transport: shippingCost ? Number(shippingCost) : null,
        date_livraison_estimee: deliveryDate || null,
      },
      {
        preserveScroll: true,
        onFinish: () => setIsUpdating(false),
        onError: (errors) => {
          const firstError = Object.values(errors)[0];
          setUpdateError(typeof firstError === "string" ? firstError : "Impossible de mettre a jour la commande.");
        },
        onSuccess: () => {
          router.reload();
        },
      },
    );
  };

  return (
    <AdminLayout>
      <AdminTopbar title="Commandes" />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Numero ou nom client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        {statusChips.map((chip) => (
          <button
            key={chip}
            onClick={() => setStatusFilter(chip)}
            className={`chip ${statusFilter === chip ? "bg-gold text-white" : "chip-inactive"}`}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="flex items-start gap-5">
        <div className="min-w-0 flex-1 overflow-hidden rounded-lg border bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">#</th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Client</th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Poids</th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Montant</th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Transport</th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Statut</th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filtered.map((order) => {
                const normalizedStatus = normalizeStatus(order.statut);

                return (
                  <tr
                    key={order.id_commande}
                    className={`border-b last:border-0 table-row-hover ${selectedOrder?.id_commande === order.id_commande ? "bg-primary/5" : ""}`}
                  >
                    <td className="px-3 py-2.5 font-mono text-xs">{order.id_commande}</td>
                    <td className="px-3 py-2.5">
                      <div>{`${order.user?.prenom ?? ""} ${order.user?.nom ?? ""}`.trim() || "Client"}</div>
                      <div className="text-xs text-muted-foreground">{order.user?.email ?? "-"}</div>
                    </td>
                    <td className="px-3 py-2.5">{order.poids_total_kg} kg</td>
                    <td className="px-3 py-2.5 font-medium">{Number(order.montant_total).toFixed(2)} EUR</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{order.mode_transport ?? "-"}</td>
                    <td className="px-3 py-2.5">
                      <span className={`status-badge ${statusColors[normalizedStatus]}`}>{statusLabels[normalizedStatus]}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => selectOrder(order)}
                        className="rounded-full border-gold/30 text-gold hover:bg-gold hover:text-black"
                      >
                        Voir détail
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-sm text-muted-foreground">
                    Aucune commande.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Dialog open={Boolean(selectedOrder)} onOpenChange={(open) => !open && setSelectedOrder(null)}>
          <DialogContent className="max-h-[90vh] w-[min(56rem,calc(100vw-2rem))] overflow-hidden border-white/10 bg-white p-0 shadow-2xl sm:max-w-none">
            {selectedOrder && (
              <>
                <DialogHeader className="border-b bg-gradient-to-r from-foreground to-foreground/90 px-6 py-5 text-left text-background sm:text-left">
                  <div className="min-w-0">
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-background/70">Commande :</div>
                    <DialogTitle className="truncate text-2xl text-background">#{selectedOrder.id_commande}</DialogTitle>
                    <div className="truncate text-sm text-background/75">
                      {`${selectedOrder.user?.prenom ?? ""} ${selectedOrder.user?.nom ?? ""}`.trim() || "Client"}
                    </div>
                    <div className="truncate text-xs text-background/55">{selectedOrder.user?.email ?? "-"}</div>
                  </div>
                </DialogHeader>

                <div className="max-h-[calc(90vh-7rem)] overflow-y-auto px-6 py-5 pb-10">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border bg-white p-4">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">Poids total :</div>
                      <div className="mt-1 font-medium">{selectedOrder.poids_total_kg} kg</div>
                    </div>
                    <div className="rounded-2xl border bg-white p-4">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">Transport :</div>
                      <div className="mt-1 font-medium">{selectedOrder.mode_transport ?? "-"}</div>
                    </div>
                    <div className="rounded-2xl border bg-white p-4">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">Frais livraison :</div>
                      <div className="mt-1 font-medium">{Number(selectedOrder.cout_transport ?? 0).toFixed(2)} EUR</div>
                    </div>
                    <div className="rounded-2xl border bg-white p-4">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">Pays livraison :</div>
                      <div className="mt-1 font-medium">{selectedOrder.pays_livraison ?? "-"}</div>
                    </div>
                    <div className="rounded-2xl border bg-white p-4">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">Date livraison estimee :</div>
                      <div className="mt-1 font-medium">
                        {selectedOrder.date_livraison_estimee
                          ? new Date(selectedOrder.date_livraison_estimee).toLocaleDateString("fr-FR")
                          : "-"}
                      </div>
                    </div>
                    <div className="rounded-2xl border bg-white p-4">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">Numero de telephone :</div>
                      <div className="mt-1 font-medium">{selectedOrder.num_telephone ?? "-"}</div>
                    </div>
                    <div className="rounded-2xl border bg-white p-4">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">Statut :</div>
                      <div className="mt-2">
                        <span className={`status-badge ${statusColors[normalizeStatus(selectedOrder.statut)]}`}>
                          {statusLabels[normalizeStatus(selectedOrder.statut)]}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2 rounded-2xl border bg-white p-4">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">Adresse livraison :</div>
                      <div className="mt-1 break-words text-sm">{selectedOrder.adresse_livraison ?? "-"}</div>
                    </div>
                    <div className="md:col-span-2 rounded-2xl border bg-white p-4">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">Email :</div>
                      <div className="mt-1 break-all text-xs">{selectedOrder.email_valide ?? "-"}</div>
                    </div>
                    <div className="md:col-span-2 rounded-2xl border bg-white p-4">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">Total TTC :</div>
                      <div className="mt-1 text-lg font-bold">{Number(selectedOrder.montant_total).toFixed(2)} EUR</div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border bg-white p-4">
                    <div className="mb-3 text-sm font-semibold">Produits commandés :</div>
                    <div className="space-y-2">
                      {selectedOrder.lignes?.length ? (
                        selectedOrder.lignes.map((line) => (
                          <div
                            key={line.id_ligne}
                            className="flex items-center justify-between gap-3 rounded-xl border bg-muted/20 px-3 py-2 text-sm"
                          >
                            <div className="min-w-0">
                              <div className="truncate font-medium">{line.produit?.nom ?? `Produit #${line.id_produit}`}</div>
                              <div className="text-xs text-muted-foreground">ID : {line.id_produit}</div>
                            </div>
                            <div className="shrink-0 rounded-full bg-background px-3 py-1 text-sm font-semibold">
                              {Number(line.quantite_kg).toFixed(2)} kg
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-lg border border-dashed px-3 py-4 text-sm text-muted-foreground">
                          Aucun detail de produit disponible pour cette commande.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 border-t pt-4">
                    {updateError && (
                      <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                        {updateError}
                      </div>
                    )}
                    <div>
                      <label className="mb-1 block text-sm font-medium">Statut :</label>
                      <Select value={updateStatus} onValueChange={(value) => setUpdateStatus(value as SelectableStatus)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selectionner un statut" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {selectableStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {statusLabels[status]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Numero de suivi :</label>
                      <Input value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Date de livraison :</label>
                      <Input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Montant produits (HT) :</label>
                      <Input
                        type="number"
                        inputMode="decimal"
                        value={productAmount}
                        onChange={(e) => setProductAmount(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Frais livraison (EUR) :</label>
                      <Input
                        type="number"
                        inputMode="decimal"
                        value={shippingCost}
                        onChange={(e) => setShippingCost(e.target.value)}
                      />
                    </div>
                    <Button className={`w-full ${isUpdating ? "opacity-70" : ""}`} onClick={handleUpdate} disabled={isUpdating}>
                      {isUpdating ? "Mise a jour..." : "Mettre a jour et notifier le client"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default OrdersPage;
