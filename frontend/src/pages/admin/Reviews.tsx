import { router, usePage } from '../../lib/inertia-shim';
import { CheckCircle, Star, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { Button } from "@/components/ui/button";

type AvisItem = {
  id_avis: number;
  note: number;
  commentaire: string | null;
  statut: "en_attente" | "publie" | "rejete";
  date_avis: string | null;
  user?: {
    nom?: string;
    prenom?: string;
  } | null;
  produit?: {
    nom?: string;
    pays_origine?: string;
  } | null;
  commande?: {
    id_commande?: number;
  } | null;
};

type ReviewsPageProps = {
  avis: {
    data: AvisItem[];
  };
};

const tabs = [
  { key: "en_attente", label: "En attente" },
  { key: "publie", label: "Publies" },
  { key: "rejete", label: "Rejetes" },
];

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("fr-FR");
};

const getClientName = (avis: AvisItem) => {
  const prenom = avis.user?.prenom ?? "";
  const nom = avis.user?.nom ?? "";
  return `${prenom} ${nom}`.trim() || "Client inconnu";
};

const ReviewsPage = () => {
  const { avis: paginated } = usePage<ReviewsPageProps>().props;
  const [reviews, setReviews] = useState<AvisItem[]>(paginated.data ?? []);
  const [activeTab, setActiveTab] = useState<"en_attente" | "publie" | "rejete">("en_attente");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      en_attente: reviews.filter((review) => review.statut === "en_attente").length,
      publie: reviews.filter((review) => review.statut === "publie").length,
      rejete: reviews.filter((review) => review.statut === "rejete").length,
    }),
    [reviews],
  );

  const filtered = reviews.filter((review) => review.statut === activeTab);

  const updateStatus = (id: number, statut: "publie" | "rejete") => {
    setActionError(null);
    setUpdatingId(id);

    router.put(
      `/admin/avis/${id}`,
      { statut },
      {
        preserveScroll: true,
        preserveState: true,
        onError: (errors) => {
          const firstError = Object.values(errors)[0];
          setActionError(typeof firstError === "string" ? firstError : "Impossible de mettre a jour cet avis.");
        },
        onSuccess: () => {
          setReviews((current) =>
            current.map((review) => (review.id_avis === id ? { ...review, statut } : review)),
          );
        },
        onFinish: () => setUpdatingId(null),
      },
    );
  };

  return (
    <AdminLayout>
      <AdminTopbar title="Avis" />

      <div className="mb-5 flex items-center gap-2">
        {actionError && (
          <div className="w-full rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {actionError}
          </div>
        )}
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "en_attente" | "publie" | "rejete")}
            className={`chip ${activeTab === tab.key ? "bg-gold text-white" : "chip-inactive"}`}
          >
            {tab.label}
            <span className="ml-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-foreground/10 text-[10px] font-bold">
              {counts[tab.key as keyof typeof counts]}
            </span>
          </button>
        ))}
      </div>

      <div className="kpi-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              {["Client", "Produit", "Note", "Commentaire", "Commande", "Origine", "Date", "Actions"].map((header) => (
                <th key={header} className="px-3 py-2 text-left font-medium text-muted-foreground">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((review) => (
              <tr key={review.id_avis} className="table-row-hover border-b last:border-0">
                <td className="px-3 py-2.5 font-medium">{getClientName(review)}</td>
                <td className="px-3 py-2.5">{review.produit?.nom ?? "Produit inconnu"}</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-3.5 w-3.5 ${
                          index < review.note
                            ? "fill-status-pending text-status-pending"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </td>
                <td className="max-w-[240px] px-3 py-2.5 text-muted-foreground">
                  <span className="line-clamp-2">{review.commentaire ?? "-"}</span>
                </td>
                <td className="px-3 py-2.5 text-muted-foreground">
                  #{review.commande?.id_commande ?? "-"}
                </td>
                <td className="px-3 py-2.5">
                  <span
                    className={`status-badge ${
                      review.produit?.pays_origine === "MDG"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted"
                    }`}
                  >
                    {review.produit?.pays_origine ?? "-"}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-muted-foreground">{formatDate(review.date_avis)}</td>
                <td className="px-3 py-2.5">
                  {review.statut === "en_attente" ? (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => updateStatus(review.id_avis, "publie")}
                        disabled={updatingId === review.id_avis}
                      >
                        <CheckCircle className="mr-1 h-3.5 w-3.5" />
                        Publier
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => updateStatus(review.id_avis, "rejete")}
                        disabled={updatingId === review.id_avis}
                      >
                        <XCircle className="mr-1 h-3.5 w-3.5" />
                        Rejeter
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {review.statut === "publie" ? "Publie" : "Rejete"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-muted-foreground">
                  Aucun avis dans cette categorie
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ReviewsPage;
