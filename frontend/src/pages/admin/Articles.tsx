import { router, useForm, usePage } from '../../lib/inertia-shim';
import { Pencil, Search, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';

import AdminLayout from '@/components/admin/AdminLayout';
import AdminTopbar from '@/components/admin/AdminTopbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type Categorie = {
  id_categorie_article: number;
  nom: string;
};

type AdminArticle = {
  id_article: number;
  titre: string;
  slug: string;
  extrait?: string | null;
  contenu?: string | null;
  image_url?: string | null;
  statut: 'brouillon' | 'publie' | 'archive';
  date_publication?: string | null;
  categorie_id?: number | null;
  categorieArticle?: { id_categorie_article: number; nom: string } | null;
};

type PageProps = {
  articles: {
    data: AdminArticle[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
  };
  categories: Categorie[];
  filters?: { search?: string; statut?: string; categorie_id?: string };
  flash?: { success?: string };
  [key: string]: unknown;
};

// FIX 2 : categorie_id → categorie (cohérent avec tous les handlers du formulaire)
const initialForm = {
  titre: '',
  slug: '',
  extrait: '',
  contenu: '',
  image: null as File | null,
  statut: 'brouillon' as 'brouillon' | 'publie' | 'archive',
  date_publication: '',
  categorie_id: '',
};

const articleService = {
  destroy(id: number) {
    if (!confirm('Supprimer cet article ?')) {
      return;
    }

    router.delete(`/admin/articles/${id}`, {
      preserveScroll: true,
    });
  },
};

export default function ArticlesPage() {
  const { articles: paginated, categories, filters, flash } = usePage<PageProps>().props;

  const [search, setSearch] = useState(filters?.search ?? '');
  const [statutFilter, setStatutFilter] = useState(filters?.statut ?? 'tous');
  const [categorieFilter, setCategorieFilter] = useState(filters?.categorie_id ?? 'toutes');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editArticle, setEditArticle] = useState<AdminArticle | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminArticle | null>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const form = useForm(initialForm);
  const categoryNameById = useMemo(
    () => new Map(categories.map((category) => [category.id_categorie_article, category.nom])),
    [categories],
  );
  const articleStatus = editArticle?.statut ?? null;
  const showDraftAction = !editArticle || articleStatus === 'brouillon';
  const showPublishAction = !editArticle || articleStatus === 'brouillon' || articleStatus === 'publie' || articleStatus === 'archive';
  const showArchiveAction = !!editArticle && (articleStatus === 'publie' || articleStatus === 'archive');

  const generateSlugFromTitle = (titre: string): string => {
    return titre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      router.get(
        '/admin/articles',
        {
          search: search || undefined,
          statut: statutFilter !== 'tous' ? statutFilter : undefined,
          categorie_id: categorieFilter !== 'toutes' ? categorieFilter : undefined,
          page: 1,
          per_page: paginated.per_page,
        },
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
          only: ['articles', 'categories', 'filters', 'flash'],
        },
      );
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [categorieFilter, paginated.per_page, search, statutFilter]);

  const previewImage = useMemo(() => {
    if (form.data.image) {
      return URL.createObjectURL(form.data.image);
    }

    return editArticle?.image_url ?? null;
  }, [editArticle?.image_url, form.data.image]);

  useEffect(() => {
    if (form.data.image && previewImage) {
      return () => URL.revokeObjectURL(previewImage);
    }
  }, [form.data.image, previewImage]);

  const resetDialogState = () => {
    form.reset();
    form.clearErrors();
    setEditArticle(null);
    setSlugManuallyEdited(false);
  };

  const openCreate = () => {
    resetDialogState();
    setDialogOpen(true);
  };

  const handleTitleChange = (value: string) => {
    form.setData('titre', value);

    if (!editArticle && !slugManuallyEdited) {
      form.setData('slug', generateSlugFromTitle(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    form.setData('slug', value);
  };

  // FIX 4 : setData utilise 'categorie' (cohérent avec initialForm)
  const openEdit = (article: AdminArticle) => {
    setEditArticle(article);
    form.setData({
      titre: article.titre,
      slug: article.slug,
      extrait: article.extrait ?? '',
      contenu: article.contenu ?? '',
      image: null,
      statut: article.statut,
      date_publication: article.date_publication ?? '',
      categorie_id: article.categorieArticle?.id_categorie_article
        ? String(article.categorieArticle.id_categorie_article)
        : article.categorie_id
          ? String(article.categorie_id)
          : '',
    });
    form.clearErrors();
    setSlugManuallyEdited(true);
    setDialogOpen(true);
  };

  const closeDialog = (open: boolean) => {
    setDialogOpen(open);

    if (!open) {
      resetDialogState();
    }
  };

  const submitForm = (statut: 'brouillon' | 'publie' | 'archive') => {
    const isUpdate = !!editArticle;
    const url = isUpdate ? `/admin/articles/${editArticle.id_article}` : '/admin/articles';

    form.setData('statut', statut);
    form.transform((data) => ({
      ...data,
      statut,
      categorie_id: data.categorie_id || null,
      ...(isUpdate ? { _method: 'put' } : {}),
    }));

    form.post(url, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        setDialogOpen(false);
        resetDialogState();
      },
    });
  };

  const handleDelete = (article: AdminArticle) => {
    setDeleteTarget(article);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      articleService.destroy(deleteTarget.id_article);
    }

    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  const goToPage = (page: number) => {
    router.get(
      '/admin/articles',
      {
        search: search || undefined,
        statut: statutFilter !== 'tous' ? statutFilter : undefined,
        categorie_id: categorieFilter !== 'toutes' ? categorieFilter : undefined,
        page,
        per_page: paginated.per_page,
      },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        only: ['articles', 'categories', 'filters', 'flash'],
      },
    );
  };

  return (
    <>
      <AdminTopbar title="Gestion des Articles" actionLabel="Nouvel article" onAction={openCreate} />

      {flash?.success && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          {flash.success}
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par titre..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={categorieFilter} onValueChange={setCategorieFilter}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Toutes les categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toutes">Toutes les categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id_categorie_article} value={String(category.id_categorie_article)}>
                {category.nom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statutFilter} onValueChange={setStatutFilter}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous</SelectItem>
            <SelectItem value="brouillon">Brouillon</SelectItem>
            <SelectItem value="publie">Publie</SelectItem>
            <SelectItem value="archive">Archive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left">Article</th>
                <th className="px-6 py-4 text-left">Categorie</th>
                <th className="px-6 py-4 text-left">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginated.data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center text-muted-foreground">
                    Aucun article trouve
                  </td>
                </tr>
              ) : (
                paginated.data.map((article) => (
                  <tr key={article.id_article} className="hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div className="font-medium">{article.titre}</div>
                      <div className="text-xs text-muted-foreground">/{article.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {article.categorieArticle?.nom ||
                        (article.categorie_id ? categoryNameById.get(article.categorie_id) : null) ||
                        '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          article.statut === 'publie'
                            ? 'bg-green-100 text-green-700'
                            : article.statut === 'brouillon'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {article.statut === 'publie'
                          ? 'Publie'
                          : article.statut === 'brouillon'
                            ? 'Brouillon'
                            : 'Archive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(article)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(article)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>
          {paginated.total > 0
            ? `Articles ${paginated.from ?? 0} a ${paginated.to ?? 0} sur ${paginated.total}`
            : 'Aucun article'}
        </span>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => goToPage(paginated.current_page - 1)}
            disabled={paginated.current_page <= 1}
          >
            Precedent
          </Button>
          <span>
            Page {paginated.current_page} sur {paginated.last_page}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => goToPage(paginated.current_page + 1)}
            disabled={paginated.current_page >= paginated.last_page}
          >
            Suivant
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="max-h-[95vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editArticle ? "Modifier l'article" : 'Creer un nouvel article'}</DialogTitle>
          </DialogHeader>

          <form className="space-y-8 py-4" onSubmit={(event) => event.preventDefault()}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Label>
                  Titre <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={form.data.titre}
                  onChange={(event) => handleTitleChange(event.target.value)}
                  placeholder="Ex: Les bienfaits du curcuma"
                  className={form.errors.titre ? 'border-red-500' : ''}
                />
                {form.errors.titre && <p className="mt-1 text-sm text-red-500">{form.errors.titre}</p>}
              </div>

              <div>
                <Label>
                  Slug <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={form.data.slug}
                  onChange={(event) => handleSlugChange(event.target.value)}
                  placeholder="les-bienfaits-du-curcuma"
                  className={form.errors.slug ? 'border-red-500' : ''}
                />
                {form.errors.slug && <p className="mt-1 text-sm text-red-500">{form.errors.slug}</p>}
              </div>
            </div>

            <div>
              <Label>Extrait (resume court)</Label>
              <Textarea
                value={form.data.extrait}
                onChange={(event) => form.setData('extrait', event.target.value)}
                rows={3}
                placeholder="Un court resume visible sur la page d'accueil..."
                className={form.errors.extrait ? 'border-red-500' : ''}
              />
              {form.errors.extrait && <p className="mt-1 text-sm text-red-500">{form.errors.extrait}</p>}
            </div>

            <div>
              <Label>
                Contenu de l'article <span className="text-red-500">*</span>
              </Label>
              <Textarea
                value={form.data.contenu}
                onChange={(event) => form.setData('contenu', event.target.value)}
                rows={14}
                placeholder="Ecrivez ici le contenu complet de votre article..."
                className={form.errors.contenu ? 'border-red-500' : ''}
              />
              {form.errors.contenu && <p className="mt-1 text-sm text-red-500">{form.errors.contenu}</p>}
            </div>

            <div>
              <Label>Categorie</Label>
              <Select
                value={form.data.categorie_id || 'aucune'}
                onValueChange={(value) => form.setData('categorie_id', value === 'aucune' ? '' : value)}
              >
                <SelectTrigger
                  className={`min-h-10 ${form.errors.categorie_id ? 'border-red-500' : ''} [&>span]:truncate`}
                >
                  <SelectValue placeholder="Selectionner une categorie" />
                </SelectTrigger>
                <SelectContent  className="bg-white">
                  <SelectItem value="aucune">Aucune categorie</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id_categorie_article} value={String(category.id_categorie_article)}>
                      {category.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.errors.categorie_id && <p className="mt-1 text-sm text-red-500">{form.errors.categorie_id}</p>}
            </div>

            <div>
              <Label>Date de publication</Label>
              <Input
                type="date"
                value={form.data.date_publication}
                onChange={(event) => form.setData('date_publication', event.target.value)}
                className={form.errors.date_publication ? 'border-red-500' : ''}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Si vous publiez sans date, elle sera generee automatiquement.
              </p>
              {form.errors.date_publication && (
                <p className="mt-1 text-sm text-red-500">{form.errors.date_publication}</p>
              )}
            </div>

            <div>
              <Label>Image mise en avant</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(event) => form.setData('image', event.target.files?.[0] || null)}
                className={form.errors.image ? 'border-red-500' : ''}
              />
              {form.errors.image && <p className="mt-1 text-sm text-red-500">{form.errors.image}</p>}

              {previewImage && (
                <div className="mt-4">
                  <p className="mb-2 text-sm text-muted-foreground">Apercu de l'image :</p>
                  <img
                    src={previewImage}
                    alt="Previsualisation"
                    className="max-h-64 rounded-lg border object-cover shadow-sm"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-end gap-4 border-t pt-8">
              {showDraftAction && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => submitForm('brouillon')}
                  disabled={form.processing}
                >
                  {form.processing && form.data.statut === 'brouillon' ? 'Enregistrement...' : 'Enregistrer comme brouillon'}
                </Button>
              )}

              {showArchiveAction && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => submitForm('archive')}
                  disabled={form.processing}
                  className="border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  {form.processing && form.data.statut === 'archive' ? 'Archivage...' : "Archiver l'article"}
                </Button>
              )}

              {showPublishAction && (
                <Button
                  type="button"
                  onClick={() => submitForm('publie')}
                  disabled={form.processing}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {form.processing && form.data.statut === 'publie' ? 'Publication en cours...' : "Publier l'article"}
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Supprimer l'article</DialogTitle>
            <DialogDescription>
              Etes-vous sur de vouloir supprimer <strong>"{deleteTarget?.titre}"</strong> ?
              <br />
              Cette action est irreversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Supprimer definitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

ArticlesPage.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
