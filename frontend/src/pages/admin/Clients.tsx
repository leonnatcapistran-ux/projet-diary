import { router, usePage } from '../../lib/inertia-shim';
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { Input } from "@/components/ui/input";

type ClientItem = {
  id_user: number;
  nom?: string | null;
  prenom?: string | null;
  email: string;
  pays_residence?: string | null;
  type_client?: string | null;
  statut?: string | null;
  entreprise?: string | null;
  date_creation?: string | null;
  commandes_count?: number;
  commandes_sum_montant_total?: number | string | null;
};

type Filters = {
  search?: string;
  type_client?: string;
  statut?: string;
};

type ClientsPageProps = {
  clients: {
    data: ClientItem[];
  };
  filters?: Filters;
};

const chips = [
  { key: "Tous", label: "Tous" },
  { key: "particulier", label: "Particuliers" },
  { key: "professionnel", label: "Professionnels" },
  { key: "inactif", label: "Inactifs" },
];

const formatClientName = (client: ClientItem) => {
  const fullName = `${client.prenom ?? ""} ${client.nom ?? ""}`.trim();
  return fullName || "Client sans nom";
};

const formatClientType = (value?: string | null) => {
  if (value === "professionnel") return "Professionnel";
  return "Particulier";
};

const formatClientStatus = (value?: string | null) => {
  return value === "inactif" ? "Inactif" : "Actif";
};

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("fr-FR");
};

const formatMoney = (value?: number | string | null) => {
  return `${Number(value ?? 0).toFixed(2)} €`;
};

const ClientsPage = () => {
  const page = usePage<ClientsPageProps>();
  const { clients, filters } = page.props;
  const clientRows = useMemo(() => clients?.data ?? [], [clients]);

  const [search, setSearch] = useState(filters?.search ?? "");
  const [activeChip, setActiveChip] = useState<string>(() => {
    if (filters?.type_client === "professionnel") return "professionnel";
    if (filters?.type_client === "particulier") return "particulier";
    if (filters?.statut === "inactif") return "inactif";
    return "Tous";
  });
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<ClientItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionType, setActionType] = useState<"deactivate" | "activate">("deactivate");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextFilters: Record<string, string> = {};

      if (search.trim()) {
        nextFilters.search = search.trim();
      }

      if (activeChip === "particulier" || activeChip === "professionnel") {
        nextFilters.type_client = activeChip;
      }

      if (activeChip === "inactif") {
        nextFilters.statut = "inactif";
      }

      router.get("/admin/clients", nextFilters, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      });
    }, 250);

    return () => clearTimeout(timeout);
  }, [search, activeChip]);

  useEffect(() => {
    if (!clientRows.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedClientId(null);
      return;
    }

    if (selectedClientId === null) {
      return;
    }

    const stillExists = clientRows.some((client) => client.id_user === selectedClientId);
    if (!stillExists) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedClientId(clientRows[0].id_user);
    }
  }, [clientRows, selectedClientId]);

  const selectedClient = useMemo(
    () => clientRows.find((client) => client.id_user === selectedClientId) ?? null,
    [clientRows, selectedClientId],
  );

  const confirmDelete = () => {
    if (!clientToDelete) return;

    setIsDeleting(true);

    const endpoint = actionType === "activate" 
      ? `/admin/clients/${clientToDelete.id_user}/activate`
      : `/admin/clients/${clientToDelete.id_user}/deactivate`;

    router.patch(endpoint, {}, {
      onSuccess: () => {
        // Recharger les clients avec les filtres actuels
        const nextFilters: Record<string, string> = {};

        if (search.trim()) {
          nextFilters.search = search.trim();
        }

        if (activeChip === "particulier" || activeChip === "professionnel") {
          nextFilters.type_client = activeChip;
        }

        if (activeChip === "inactif") {
          nextFilters.statut = "inactif";
        }

        router.get("/admin/clients", nextFilters, {
          preserveState: false,
          preserveScroll: true,
          replace: true,
          onFinish: () => {
            setClientToDelete(null);
            setShowDeleteModal(false);
            setSelectedClientId(null);
            setIsDeleting(false);
          },
        });
      },
      onError: () => {
        const message = actionType === "activate" 
          ? "Erreur lors de l'activation du client"
          : "Erreur lors de la désactivation du client";
        alert(message);
        setIsDeleting(false);
      },
    });
  };

  return (
    <AdminLayout>
      <AdminTopbar title="Clients" />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher nom ou email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-9"
          />
        </div>

        {chips.map((chip) => (
          <button
            key={chip.key}
            onClick={() => setActiveChip(chip.key)}
            className={`chip ${activeChip === chip.key ? "bg-gold text-white" : "chip-inactive"}`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <div className="flex gap-5">
        <div className={`kpi-card overflow-x-auto ${selectedClient ? "flex-1" : "w-full"} ${showDeleteModal ? "pointer-events-none opacity-50" : ""}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                {["Nom", "Type", "Pays", "Total depense", "Statut", "Actions"].map((header) => (
                  <th key={header} className="px-3 py-2 text-left font-medium text-muted-foreground">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientRows.map((client) => (
                <tr
                  key={client.id_user}
                  onClick={() => setSelectedClientId(client.id_user)}
                  className={`table-row-hover cursor-pointer border-b last:border-0 ${
                    selectedClientId === client.id_user ? "bg-primary/5" : ""
                  }`}
                >
                  <td className="px-3 py-2.5">
                    <div className="font-medium">{formatClientName(client)}</div>
                    <div className="text-xs text-muted-foreground">{client.email}</div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`status-badge ${
                        client.type_client === "professionnel"
                          ? "bg-status-shipped-bg text-status-shipped"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {formatClientType(client.type_client)}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">{client.pays_residence || "-"}</td>
                  <td className="px-3 py-2.5 font-medium">{formatMoney(client.commandes_sum_montant_total)}</td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`status-badge ${
                        client.statut === "inactif"
                          ? "bg-muted text-muted-foreground"
                          : "bg-status-delivered-bg text-status-delivered"
                      }`}
                    >
                      {formatClientStatus(client.statut)}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setClientToDelete(client);
                        setActionType(client.statut === "inactif" ? "activate" : "deactivate");
                        setShowDeleteModal(true);
                      }}
                      className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                        client.statut === "inactif"
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                      }`}
                    >
                      {client.statut === "inactif" ? "Activer" : "Désactiver"}
                    </button>
                  </td>
                </tr>
              ))}

              {clientRows.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    Aucun client trouve.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedClient ? (
          <div className="w-80 shrink-0">
            <div className="kpi-card">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold">{formatClientName(selectedClient)}</div>
                  <div className="text-sm text-muted-foreground">{selectedClient.email}</div>
                </div>
                <button
                  onClick={() => setSelectedClientId(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Type</span>
                  <span>{formatClientType(selectedClient.type_client)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Pays</span>
                  <span>{selectedClient.pays_residence || "-"}</span>
                </div>
                {selectedClient.entreprise ? (
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Entreprise</span>
                    <span>{selectedClient.entreprise}</span>
                  </div>
                ) : null}
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Commandes</span>
                  <span>{selectedClient.commandes_count ?? 0}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Total depense</span>
                  <span className="font-medium">{formatMoney(selectedClient.commandes_sum_montant_total)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Inscrit le</span>
                  <span>{formatDate(selectedClient.date_creation)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Statut</span>
                  <span>{formatClientStatus(selectedClient.statut)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {showDeleteModal && clientToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-sm">
            <h3 className="text-lg font-semibold mb-2">
              {actionType === "activate" ? "Activer le client" : "Désactiver le client"}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {actionType === "activate"
                ? `Êtes-vous sûr de vouloir activer le client ${formatClientName(clientToDelete)} ? Son compte redeviendra accessible.`
                : `Êtes-vous sûr de vouloir désactiver le client ${formatClientName(clientToDelete)} ? Son compte deviendra inaccessible.`}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-md border border-input hover:bg-muted disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className={`px-4 py-2 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed transition ${
                  actionType === "activate"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                {isDeleting
                  ? actionType === "activate"
                    ? "Activation..."
                    : "Désactivation..."
                  : actionType === "activate"
                    ? "Activer"
                    : "Désactiver"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ClientsPage;
