import { router, usePage } from '../../lib/inertia-shim';
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { Button } from "@/components/ui/button";

type MessageItem = {
  id_message: number;
  nom: string;
  email: string;
  sujet: string;
  message: string;
  statut: "non_lu" | "lu" | "traite";
  date_envoi?: string | null;
};

type MessagesPageProps = {
  messages: {
    data: MessageItem[];
  };
};

const chips = ["Non lus", "Lus", "Traites"];

const sujetLabels: Record<string, string> = {
  partenariat: "Partenariat",
  demande_produit: "Demande produit",
  livraison: "Livraison",
  autre: "Autre",
};

const categoryColors: Record<string, string> = {
  Partenariat: "bg-status-shipped-bg text-status-shipped",
  Livraison: "bg-status-pending-bg text-status-pending",
  "Demande produit": "bg-status-delivered-bg text-status-delivered",
  Autre: "bg-muted text-muted-foreground",
};

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const MessagesPage = () => {
  const { messages: paginated } = usePage<MessagesPageProps>().props;
  const [messages, setMessages] = useState<MessageItem[]>(paginated.data ?? []);
  const [activeChip, setActiveChip] = useState("Non lus");
  const [selectedMsg, setSelectedMsg] = useState<MessageItem | null>(messages[0] ?? null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const normalizedMessages = useMemo(
    () =>
      messages.map((message) => ({
        ...message,
        category: sujetLabels[message.sujet] ?? "Autre",
      })),
    [messages],
  );

  const filtered = normalizedMessages.filter((message) => {
    if (activeChip === "Non lus") return message.statut === "non_lu";
    if (activeChip === "Lus") return message.statut === "lu";
    if (activeChip === "Traites") return message.statut === "traite";
    return true;
  });

  const updateLocalMessage = (id: number, payload: Partial<MessageItem>) => {
    setMessages((current) =>
      current.map((message) =>
        message.id_message === id ? { ...message, ...payload } : message,
      ),
    );
    setSelectedMsg((current) =>
      current && current.id_message === id ? { ...current, ...payload } : current,
    );
  };

  const sendUpdate = (message: MessageItem, payload: { statut: "non_lu" | "lu" | "traite" }) => {
    setActionError(null);
    setIsSubmitting(true);

    router.put(`/admin/messages/${message.id_message}`, payload, {
      preserveScroll: true,
      preserveState: true,
      onError: (errors) => {
        const firstError = Object.values(errors)[0];
        setActionError(typeof firstError === "string" ? firstError : "Impossible de mettre a jour ce message.");
      },
      onSuccess: () => {
        updateLocalMessage(message.id_message, {
          statut: payload.statut,
        });
      },
      onFinish: () => setIsSubmitting(false),
    });
  };

  const selectMsg = (message: MessageItem) => {
    setSelectedMsg(message);
    setActionError(null);

    if (message.statut === "non_lu") {
      sendUpdate(message, { statut: "lu" });
    }
  };

  const handleTreat = () => {
    if (!selectedMsg) return;
    sendUpdate(selectedMsg, { statut: "traite" });
  };

  const handleDelete = () => {
    if (!selectedMsg) return;
    if (!window.confirm("Supprimer définitivement ce message ?")) return;

    setIsSubmitting(true);

    router.delete(`/admin/messages/${selectedMsg.id_message}`, {
      preserveScroll: true,
      preserveState: true,
      onError: () => {
        setActionError("Impossible de supprimer ce message pour le moment.");
      },
      onSuccess: () => {
        setMessages((current) => current.filter((message) => message.id_message !== selectedMsg.id_message));
        setSelectedMsg(null);
      },
      onFinish: () => setIsSubmitting(false),
    });
  };

  return (
    <AdminLayout>
      <AdminTopbar title="Messages contact" />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        {chips.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveChip(chip)}
            className={`chip ${activeChip === chip ? "bg-gold text-white" : "chip-inactive"}`}>
            {chip}
          </button>
        ))}
      </div>

      <div className="flex gap-5">
        <div className="flex-1 space-y-2">
          {filtered.map((message) => (
            <div
              key={message.id_message}
              onClick={() => selectMsg(message)}
              className={`kpi-card cursor-pointer transition-all hover:shadow-md ${
                selectedMsg?.id_message === message.id_message ? "ring-2 ring-primary" : ""
              } ${message.statut === "non_lu" ? "border-l-4 border-l-primary" : ""}`}
            >
              <div className="mb-1 flex items-start justify-between">
                <span className="text-sm font-medium">{message.nom}</span>
                <span className="text-xs text-muted-foreground">{formatDate(message.date_envoi)}</span>
              </div>
              <div className="mb-1 text-sm font-medium">{sujetLabels[message.sujet] ?? message.sujet}</div>
              <div className="mb-2 truncate text-xs text-muted-foreground">{message.message}</div>
              <span
                className={`status-badge text-[10px] ${
                  categoryColors[sujetLabels[message.sujet] ?? "Autre"] || categoryColors.Autre
                }`}
              >
                {sujetLabels[message.sujet] ?? "Autre"}
              </span>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">Aucun message</div>
          )}
        </div>

        {selectedMsg && (
          <div className="w-[420px] shrink-0">
            <div className="kpi-card">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="font-semibold">{selectedMsg.nom}</div>
                  <div className="text-xs text-muted-foreground">
                    {selectedMsg.email} · {formatDate(selectedMsg.date_envoi)}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMsg(null)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Fermer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <h3 className="mb-3 font-medium">{sujetLabels[selectedMsg.sujet] ?? selectedMsg.sujet}</h3>
              <div className="mb-4 whitespace-pre-line rounded-lg bg-secondary p-4 text-sm">
                {selectedMsg.message}
              </div>

              <div className="space-y-3">
                {actionError && (
                  <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                    {actionError}
                  </div>
                )}
                <div className="rounded-lg border bg-background p-4 text-sm text-muted-foreground">
                  Si une reponse est necessaire, l&apos;admin contacte directement le client par email a
                  l&apos;adresse affichee ci-dessus.
                </div>
                <Button
                  variant="outline"
                  onClick={handleTreat}
                  disabled={selectedMsg.statut === "traite" || isSubmitting}
                  className="w-full"
                >
                  {selectedMsg.statut === "traite" ? "Traite" : "Marquer comme traite"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="w-full"
                >
                  Supprimer le message
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default MessagesPage;
