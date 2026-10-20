import { useForm, usePage } from '../lib/inertia-shim';
import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import PublicLayout from "@/components/public-layout";

type LigneProduit = {
  id_produit: number;
  produit?: {
    id_produit: number;
    nom: string;
  } | null;
};

type CommandeItem = {
  id_commande: number;
  date_commande?: string;
  pays_origine: string;
  statut: string;
  montant_total: number;
  mode_transport?: string | null;
  can_leave_review?: boolean;
  avis?: {
    id_avis: number;
    note: number;
    commentaire?: string | null;
    statut: string;
  } | null;
  lignes?: LigneProduit[];
  facture?: {
    numero_facture?: string | null;
    montant_ttc?: number | string | null;
  } | null;
};

type OrdersPageProps = {
  commandes: {
    data: CommandeItem[];
  };
  flash?: {
    success?: string;
  };
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

const reviewStatusLabels: Record<string, string> = {
  en_attente: "En attente de modération",
  publie: "Publié",
  rejete: "Rejeté",
};

const normalizeStatus = (status: string) => {
  switch (status) {
    case "confirmée":
    case "confirmÃ©e":
      return "confirmee";
    case "préparation":
    case "prÃ©paration":
      return "preparation";
    case "expédiée":
    case "expÃ©diÃ©e":
      return "expediee";
    case "livrée":
    case "livrÃ©e":
      return "livree";
    case "annulée":
    case "annulÃ©e":
      return "annulee";
    default:
      return status;
  }
};

const formatOrigin = (origin?: string | null) => {
  if (!origin) {
    return "-";
  }

  return origin === "MDG" ? "MADAGASCAR" : origin;
};

const AccountOrders = () => {
  const { commandes, flash } = usePage<OrdersPageProps>().props;
  const orders = useMemo(() => commandes?.data ?? [], [commandes]);
  const [openReviewFor, setOpenReviewFor] = useState<number | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  const { data, setData, post, processing, errors, reset } = useForm({
    id_commande: 0,
    id_produit: 0,
    note: 0,
    commentaire: "",
  });

  const selectedOrder = useMemo(
    () => orders.find((order) => order.id_commande === openReviewFor) ?? null,
    [orders, openReviewFor],
  );

  const selectedProduct = selectedOrder?.lignes?.[0]?.produit ?? null;

  const openReviewForm = (order: CommandeItem) => {
    const product = order.lignes?.[0]?.produit;
    if (!product) return;

    setOpenReviewFor(order.id_commande);
    setHoveredStar(0);
    setData({
      id_commande: order.id_commande,
      id_produit: product.id_produit,
      note: 0,
      commentaire: "",
    });
  };

  const closeReviewForm = () => {
    setOpenReviewFor(null);
    setHoveredStar(0);
    reset();
  };

  const submitReview = () => {
    post("/compte/avis", {
      preserveScroll: true,
      onSuccess: () => {
        closeReviewForm();
      },
    });
  };

  return (
    <PublicLayout>
      <section className="min-h-screen bg-gray-800 pb-20 pt-36">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10">
            <h1 className="serif text-3xl font-bold text-white md:text-4xl">Mes commandes</h1>
            <p className="mt-2 text-white/60">Suivi de vos commandes en cours et historiques.</p>
          </div>

          {flash?.success ? (
            <div className="mb-6 rounded-2xl border border-forest/10 bg-white px-5 py-4 text-sm text-forest shadow-sm">
              {flash.success}
            </div>
          ) : null}

          <div className="overflow-x-auto rounded-2xl border border-forest/10 bg-white/90 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {["Numero", "Date", "Origine", "Transport", "Total", "Facture", "Total facture", "PDF", "Statut", "Avis"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-medium text-forest/60">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const rawStatus = typeof o.statut === "string" ? o.statut : "";
                  const safeStatus = rawStatus.startsWith("ASI-") ? "en_attente" : rawStatus || "en_attente";
                  const normalizedStatus = normalizeStatus(safeStatus);
                  const rawFactureNumber = typeof o.facture?.numero_facture === "string" ? o.facture.numero_facture : "";
                  const factureNumber = rawFactureNumber
                    ? rawFactureNumber.split(";").map((part) => part.trim()).filter(Boolean).pop()
                    : null;
                  const factureTotal = o.facture?.montant_ttc ?? null;

                  return (
                    <tr key={o.id_commande} className="border-b last:border-0">
                      <td className="px-4 py-3 font-mono text-xs">{o.id_commande}</td>
                      <td className="px-4 py-3">{o.date_commande ? new Date(o.date_commande).toLocaleDateString() : "-"}</td>
                      <td className="px-4 py-3">{formatOrigin(o.pays_origine)}</td>
                      <td className="px-4 py-3">{o.mode_transport ?? "-"}</td>
                      <td className="px-4 py-3 font-medium">{Number(o.montant_total ?? 0).toFixed(2)} </td>
                      <td className="px-4 py-3">
                        {factureNumber ? (
                          <span className="font-medium text-forest">{factureNumber}</span>
                        ) : (
                          <span className="text-forest/40">En attente</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {factureTotal !== null && factureTotal !== undefined
                          ? `${Number(factureTotal).toFixed(2)} EUR`
                          : "-"}
                      </td>
                      <td className="px-4 py-3">
                        {factureNumber ? (
                          <a
                            href={`/compte/commandes/${o.id_commande}/facture`}
                            className="inline-flex items-center rounded-full bg-forest px-3 py-1 text-xs text-white transition-colors hover:bg-forest/90"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Télécharger
                          </a>
                        ) : (
                          <span className="text-forest/40">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-forest/10 px-3 py-1 text-xs text-forest">
                          {statusLabels[normalizedStatus] ?? normalizedStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {o.avis ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                  key={index}
                                  className={`h-3.5 w-3.5 ${
                                    index < o.avis!.note ? "fill-status-pending text-status-pending" : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-xs text-forest/60">
                              {reviewStatusLabels[o.avis.statut] ?? o.avis.statut}
                            </div>
                          </div>
                        ) : o.can_leave_review ? (
                          <button
                            type="button"
                            onClick={() => openReviewForm(o)}
                            className="rounded-full border border-forest/20 px-3 py-1 text-xs text-forest transition-colors hover:bg-forest/5"
                          >
                            Laisser un avis
                          </button>
                        ) : (
                          <span className="text-xs text-forest/40">Non disponible</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-forest/50">
                      Aucune commande pour le moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {selectedOrder && selectedProduct ? (
            <div className="mt-8 rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-forest">Laisser un avis</h2>
                  <p className="mt-1 text-sm text-forest/60">
                    Commande #{selectedOrder.id_commande} - {selectedProduct.nom}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeReviewForm}
                  className="text-sm text-forest/60 hover:text-forest"
                >
                  Fermer
                </button>
              </div>

              <div className="mb-4">
                <div className="mb-2 text-sm font-medium text-forest">Votre note</div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const value = index + 1;
                    const active = (hoveredStar || data.note) >= value;

                    return (
                      <button
                        key={value}
                        type="button"
                        onMouseEnter={() => setHoveredStar(value)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => setData("note", value)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star className={`h-6 w-6 ${active ? "fill-status-pending text-status-pending" : "text-muted"}`} />
                      </button>
                    );
                  })}
                </div>
                {errors.note ? <div className="mt-2 text-sm text-red-600">{errors.note}</div> : null}
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-forest">Commentaire</label>
                <textarea
                  value={data.commentaire}
                  onChange={(event) => setData("commentaire", event.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-forest/15 bg-offwhite px-4 py-3 text-sm outline-none transition focus:border-forest/30"
                  placeholder="Partagez votre expérience sur ce produit..."
                />
                {errors.commentaire ? <div className="mt-2 text-sm text-red-600">{errors.commentaire}</div> : null}
                {errors.id_commande ? <div className="mt-2 text-sm text-red-600">{errors.id_commande}</div> : null}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={submitReview}
                  disabled={processing || data.note < 1}
                  className="rounded-full bg-forest px-5 py-2 text-sm font-medium text-white transition hover:bg-forest/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {processing ? "Envoi..." : "Envoyer l'avis"}
                </button>
                <button
                  type="button"
                  onClick={closeReviewForm}
                  className="rounded-full border border-forest/15 px-5 py-2 text-sm text-forest transition hover:bg-forest/5"
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </PublicLayout>
  );
};

export default AccountOrders;
