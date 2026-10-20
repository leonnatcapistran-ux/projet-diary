import { router, useForm, usePage } from '../../lib/inertia-shim';
import { Pencil, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import admin from "@/routes/admin";

const chips = ["Tous", "Actifs", "Inactifs"] as const;

type Produit = {
  id_produit: number;
  nom: string;
  description: string | null;
  origine_details?: string | null;
  calibre_variete?: string | null;
  pays_origine: "MDG" | "MAR";
  categorie: string;
  stock_disponible: number | string;
  poids_unitaire_kg: number | string;
  prix_unitaire_kg: number | null | string;
  conditionnement?: string | null;
  methode_extraction?: string | null;
  moq?: string | null;
  certifications?: string | null;
  saisonnalite?: string | null;
  utilisation?: string | null;
  image_url: string | null;
  statut: "actif" | "inactif";
};

type ProductsPageProps = {
  produits: {
    data: Produit[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
  };
  filters?: {
    search?: string;
    statut?: string;
  };
};

type ProductFormErrors = {
  nom?: string;
  categorie?: string;
  stock_disponible?: string;
  poids_unitaire_kg?: string;
  prix_unitaire_kg?: string;
  image?: string;
};

const ProductsPage = () => {
  const { produits, filters } = usePage<ProductsPageProps>().props;
  const [search, setSearch] = useState(filters?.search ?? "");
  const [activeChip, setActiveChip] = useState<(typeof chips)[number]>(
    filters?.statut === "actif" ? "Actifs" : filters?.statut === "inactif" ? "Inactifs" : "Tous",
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Produit | null>(null);
  const [afficheDialog, setAfficheDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Produit | null>(null);
  const [categorieSearch, setCategorieSearch] = useState("");
  const [showCategorieSuggestions, setShowCategorieSuggestions] = useState(false);
  const [errors, setErrors] = useState<ProductFormErrors>({});

  const { data, setData, reset } = useForm({
    nom: "",
    description: "",
    origine_details: "",
    calibre_variete: "",
    pays_origine: "MDG",
    categorie: "",
    stock_disponible: 0,
    poids_unitaire_kg: 1,
    prix_unitaire_kg: null as number | null,
    conditionnement: "",
    methode_extraction: "",
    moq: "",
    certifications: "",
    saisonnalite: "",
    utilisation: "",
    image: null as File | null,
    statut: "actif" as "actif" | "inactif",
  });

  const categories = useMemo(() => {
    const unique = Array.from(new Set(produits.data.map((p) => p.categorie).filter(Boolean)));
    return unique.sort();
  }, [produits.data]);

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => cat.toLowerCase().includes(categorieSearch.toLowerCase()));
  }, [categories, categorieSearch]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      router.get(
        "/admin/produits",
        {
          search: search || undefined,
          statut: activeChip === "Actifs" ? "actif" : activeChip === "Inactifs" ? "inactif" : undefined,
          page: 1,
          per_page: produits.per_page,
        },
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
          only: ["produits", "filters"],
        },
      );
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [activeChip, produits.per_page, search]);

  const goToPage = (page: number) => {
    router.get(
      "/admin/produits",
      {
        search: search || undefined,
        statut: activeChip === "Actifs" ? "actif" : activeChip === "Inactifs" ? "inactif" : undefined,
        page,
        per_page: produits.per_page,
      },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        only: ["produits", "filters"],
      },
    );
  };

  const openCreate = () => {
    setEditProduct(null);
    reset();
    setErrors({});
    setCategorieSearch("");
    setShowCategorieSuggestions(false);
    setDialogOpen(true);
  };

  const openEdit = (p: Produit) => {
    setEditProduct(p);
    setData({
      nom: p.nom,
      description: p.description ?? "",
      origine_details: p.origine_details ?? "",
      calibre_variete: p.calibre_variete ?? "",
      pays_origine: "MDG",
      categorie: p.categorie,
      stock_disponible: Number(p.stock_disponible ?? 0),
      poids_unitaire_kg: Number(p.poids_unitaire_kg ?? 1),
      prix_unitaire_kg: p.prix_unitaire_kg !== null ? Number(p.prix_unitaire_kg) : null,
      conditionnement: p.conditionnement ?? "",
      methode_extraction: p.methode_extraction ?? "",
      moq: p.moq ?? "",
      certifications: p.certifications ?? "",
      saisonnalite: p.saisonnalite ?? "",
      utilisation: p.utilisation ?? "",
      image: null,
      statut: p.statut,
    });
    setErrors({});
    setCategorieSearch(p.categorie);
    setShowCategorieSuggestions(false);
    setDialogOpen(true);
  };

  const handleSave = () => {
    const newErrors: ProductFormErrors = {};

    if (!data.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }
    if (!data.categorie.trim()) {
      newErrors.categorie = "La categorie est requise";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const formData = {
      ...data,
      pays_origine: "MDG" as const,
      prix_unitaire_kg: !data.prix_unitaire_kg ? 0 : data.prix_unitaire_kg,
    };

    if (editProduct) {
      router.put(admin.produits.update(editProduct.id_produit).url, formData, {
        preserveScroll: true,
        onError: (serverErrors) => setErrors(serverErrors as ProductFormErrors),
        onSuccess: () => setDialogOpen(false),
      });
      return;
    }

    router.post(admin.produits.store().url, formData, {
      preserveScroll: true,
      onError: (serverErrors) => setErrors(serverErrors as ProductFormErrors),
      onSuccess: () => {
        setDialogOpen(false);
        reset();
      },
    });
  };

  const handleDelete = (p: Produit) => {
    setDeleteTarget(p);
    setAfficheDialog(true);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    router.delete(admin.produits.destroy(deleteTarget.id_produit).url, {
      onSuccess: () => {
        setAfficheDialog(false);
        setDeleteTarget(null);
      },
    });
  };

  return (
    <>
      <AdminTopbar title="Produits" actionLabel="Nouveau produit" onAction={openCreate} />

      <Dialog
        open={afficheDialog}
        onOpenChange={(open) => {
          setAfficheDialog(open);
          if (!open) {
            setDeleteTarget(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Supprimer le produit
            </DialogTitle>
            <DialogDescription className="mb-5 mt-5 text-destructive">
              Cette action est <strong>irreversible</strong>.
            </DialogDescription>
            <DialogDescription className="text-muted-foreground">
              Le produit et ses dépendances test seront supprimés.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 space-x-10 sm:gap-0">
            <Button className="ml-[-50px]" variant="outline" onClick={() => setAfficheDialog(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Confirmer la suppression
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher un produit..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => setActiveChip(c)}
              className={`chip ${activeChip === c ? "rounded-2xl bg-gold px-2 py-1 text-white" : "rounded-2xl bg-forest/10 px-2 py-1 text-gray-500"}`}
            >
              {c}
            </button>
          ))}
        </div>

      </div>

      <div className="kpi-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              {["Nom", "Categorie", "Stock", "Prix/kg", "Statut", "Actions"].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-medium text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {produits.data.map((p) => (
              <tr key={p.id_produit} className={`table-row-hover border-b last:border-0 ${Number(p.stock_disponible) < 50 ? "table-row-alert" : ""}`}>
                <td className="px-3 py-2.5 font-medium">{p.nom}</td>
                <td className="px-3 py-2.5 text-muted-foreground">{p.categorie}</td>
                <td className="px-3 py-2.5">{Number(p.stock_disponible)} kg</td>
                <td className="px-3 py-2.5 font-medium">
                  {p.prix_unitaire_kg !== null ? `${Number(p.prix_unitaire_kg).toFixed(2)} EUR` : "Prix a consulter"}
                </td>
                <td className="px-3 py-2.5">
                  <span className={`status-badge ${p.statut === "actif" ? "bg-status-delivered-bg text-status-delivered" : "bg-muted text-muted-foreground"}`}>
                    {p.statut === "actif" ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(p)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {produits.data.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-sm text-muted-foreground">
                  Aucun produit trouve.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>
          {produits.total > 0
            ? `Produits ${produits.from ?? 0} a ${produits.to ?? 0} sur ${produits.total}`
            : "Aucun produit"}
        </span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => goToPage(produits.current_page - 1)} disabled={produits.current_page <= 1}>
            Precedent
          </Button>
          <span className="px-2 text-sm text-muted-foreground">
            Page {produits.current_page} sur {produits.last_page}
          </span>
          <Button variant="outline" size="sm" onClick={() => goToPage(produits.current_page + 1)} disabled={produits.current_page >= produits.last_page}>
            Suivant
          </Button>
        </div>
      </div>


      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editProduct ? "Modifier le produit" : "Nouveau produit"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {(errors.stock_disponible || errors.prix_unitaire_kg || errors.poids_unitaire_kg || errors.image) && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                Corrigez les champs en erreur avant d'enregistrer le produit.
              </div>
            )}
            <p>Pour ajouter une liste de valeurs, veuillez séparer les éléments par des <span className="text-destructive">points virgules</span></p>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Nom <span className="text-destructive">*</span>
              </label>
              <Input
                value={data.nom}
                onChange={(e) => setData("nom", e.target.value)}
                className={errors.nom ? "border-destructive focus-visible:ring-destructive" : ""}
                placeholder={errors.nom ?? ""}
              />
              {errors.nom && <p className="mt-1 text-sm text-destructive">{errors.nom}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Description</label>
              <Input value={data.description} onChange={(e) => setData("description", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Origine detaillee</label>
                <Input value={data.origine_details} onChange={(e) => setData("origine_details", e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Type & Qualité</label>
                <Input value={data.calibre_variete} onChange={(e) => setData("calibre_variete", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Origine</label>
                <Input value="Madagascar" disabled />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Categorie <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Input
                    value={data.categorie}
                    onChange={(e) => {
                      setData("categorie", e.target.value);
                      setCategorieSearch(e.target.value);
                      setShowCategorieSuggestions(true);
                    }}
                    onFocus={() => setShowCategorieSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowCategorieSuggestions(false), 200)}
                    className={errors.categorie ? "border-destructive focus-visible:ring-destructive" : ""}
                    placeholder="Ecrire ou selectionner..."
                  />
                  {showCategorieSuggestions && categorieSearch && filteredCategories.length > 0 && (
                    <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md border border-input bg-white shadow-md">
                      {filteredCategories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setData("categorie", cat);
                            setCategorieSearch(cat);
                            setShowCategorieSuggestions(false);
                          }}
                          className="w-full px-3 py-2 text-left text-sm transition hover:bg-accent"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.categorie && <p className="mt-1 text-sm text-destructive">{errors.categorie}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Conditionnement</label>
                <Input placeholder="ex: Conditionnement 1 ; Conditionnement 2 ..." value={data.conditionnement} onChange={(e) => setData("conditionnement", e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Qualité & finition</label>
                <Input  placeholder="ex: Qualité 1 ; Qualité 2 ..." value={data.methode_extraction} onChange={(e) => setData("methode_extraction", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">MOQ</label>
                <Input placeholder="ex: 100 ; 500 ..." value={data.moq} onChange={(e) => setData("moq", e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Caractéristiques techniques</label>
                <Input placeholder="ex: Caractéristique 1 ; Caractéristique 2 ..." value={data.certifications} onChange={(e) => setData("certifications", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Conservation</label>
                <Input placeholder="ex: Conservation 1 ; Conservation 2 ..." value={data.saisonnalite} onChange={(e) => setData("saisonnalite", e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Utilisation</label>
                <textarea
                  value={data.utilisation}
                  onChange={(e) => setData("utilisation", e.target.value)}
                  aria-label="Utilisation du produit"
                  placeholder="Decrivez l'usage recommande du produit"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Stock (kg)</label>
                <Input
                  type="number"
                  value={data.stock_disponible}
                  onChange={(e) => setData("stock_disponible", Number(e.target.value))}
                  className={errors.stock_disponible ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.stock_disponible && <p className="mt-1 text-sm text-destructive">{errors.stock_disponible}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Poids unitaire (kg)</label>
                <Input
                  type="number"
                  value={data.poids_unitaire_kg}
                  onChange={(e) => setData("poids_unitaire_kg", Number(e.target.value))}
                  className={errors.poids_unitaire_kg ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.poids_unitaire_kg && <p className="mt-1 text-sm text-destructive">{errors.poids_unitaire_kg}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Prix/kg (EUR)</label>
                <Input
                  type="number"
                  value={data.prix_unitaire_kg ?? ""}
                  onChange={(e) => setData("prix_unitaire_kg", e.target.value === "" ? null : Number(e.target.value))}
                  className={errors.prix_unitaire_kg ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.prix_unitaire_kg && <p className="mt-1 text-sm text-destructive">{errors.prix_unitaire_kg}</p>}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Image</label>
              <Input type="file" accept="image/*" onChange={(e) => setData("image", e.target.files?.[0] ?? null)} />
              {errors.image && <p className="mt-1 text-sm text-destructive">{errors.image}</p>}
              {editProduct?.image_url && !data.image && (
                <div className="mt-3 flex items-center gap-3">
                  <img src={editProduct.image_url} alt={editProduct.nom} className="h-14 w-14 rounded-lg border border-forest/10 object-cover" />
                  <div className="text-xs text-muted-foreground">
                    Image actuelle. Choisis un nouveau fichier pour la remplacer.
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={data.statut === "actif"} onCheckedChange={(v) => setData("statut", v ? "actif" : "inactif")} />
              <span className="text-sm">{data.statut === "actif" ? "Actif" : "Inactif"}</span>
            </div>
            <Button className="w-full" onClick={handleSave}>
              {editProduct ? "Enregistrer les modifications" : "Creer le produit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

ProductsPage.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default ProductsPage;
