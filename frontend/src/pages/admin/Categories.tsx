import { Head, router, useForm, usePage } from '../../lib/inertia-shim';
import { Edit, ListTree, Save, Trash2, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';

import AdminLayout from '@/components/admin/AdminLayout';
import AdminTopbar from '@/components/admin/AdminTopbar';
import { Button } from '@/components/ui/button';

type Category = {
  id_categorie_article: number;
  nom: string;
  description?: string | null;
  articles_count?: number;
};

type CategoryPageProps = {
  categories: {
    data: Category[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
  };
  flash?: {
    success?: string;
    error?: string;
  };
  [key: string]: unknown;
};

export default function CategoriesPage() {
  const { categories, flash } = usePage<CategoryPageProps>().props;
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const createForm = useForm({
    nom: '',
    description: '',
  });

  const editForm = useForm({
    nom: '',
    description: '',
  });

  const closeCreate = () => {
    setIsCreateOpen(false);
    createForm.reset();
    createForm.clearErrors();
  };

  const closeEdit = () => {
    setEditCategory(null);
    editForm.reset();
    editForm.clearErrors();
  };

  const openCreate = () => {
    createForm.reset();
    createForm.clearErrors();
    setIsCreateOpen(true);
  };

  const openEdit = (category: Category) => {
    editForm.clearErrors();
    editForm.setData({
      nom: category.nom,
      description: category.description ?? '',
    });
    setEditCategory(category);
  };

  const submitCreate = (event: React.FormEvent) => {
    event.preventDefault();

    createForm.post('/admin/categories', {
      preserveScroll: true,
      onSuccess: () => closeCreate(),
    });
  };

  const submitEdit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!editCategory) {
      return;
    }

    editForm.put(`/admin/categories/${editCategory.id_categorie_article}`, {
      preserveScroll: true,
      onSuccess: () => closeEdit(),
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm('Supprimer cette categorie ?')) {
      return;
    }

    router.delete(`/admin/categories/${id}`, {
      preserveScroll: true,
    });
  };

  const goToPage = (page: number) => {
    router.get(
      '/admin/categories',
      { page, per_page: categories.per_page },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        only: ['categories', 'flash'],
      },
    );
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <Head title="Gestion Categories" />

      <AdminTopbar title="Gestion des Categories" actionLabel="Nouvelle categorie" onAction={openCreate} />

      {flash?.success && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 shadow-sm">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          {flash.success}
        </div>
      )}

      {flash?.error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700 shadow-sm">
          <div className="h-2 w-2 rounded-full bg-rose-500" />
          {flash.error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Nom de la categorie</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Description</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Articles</th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center text-sm text-slate-500">
                  Aucune categorie disponible.
                </td>
              </tr>
            ) : (
              categories.data.map((category) => (
                <tr key={category.id_categorie_article} className="group transition-colors hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-medium text-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-slate-100 p-2 transition-colors group-hover:bg-white">
                        <ListTree size={16} className="text-slate-500" />
                      </div>
                      {category.nom}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{category.description || '—'}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{category.articles_count ?? 0}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(category)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(category.id_categorie_article)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <span>
          {categories.total > 0
            ? `Categories ${categories.from ?? 0} a ${categories.to ?? 0} sur ${categories.total}`
            : 'Aucune categorie'}
        </span>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => goToPage(categories.current_page - 1)}
            disabled={categories.current_page <= 1}
          >
            Precedent
          </Button>
          <span>
            Page {categories.current_page} sur {categories.last_page}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => goToPage(categories.current_page + 1)}
            disabled={categories.current_page >= categories.last_page}
          >
            Suivant
          </Button>
        </div>
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <h2 className="font-bold text-slate-800">Nouvelle categorie</h2>
              <button type="button" onClick={closeCreate} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={submitCreate} className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Nom</label>
                <input
                  autoFocus
                  type="text"
                  value={createForm.data.nom}
                  onChange={(event) => createForm.setData('nom', event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 outline-none transition-all focus:ring-4 ${
                    createForm.errors.nom
                      ? 'border-rose-300 focus:ring-rose-50'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-50'
                  }`}
                  placeholder="Nom de la categorie..."
                />
                {createForm.errors.nom && <p className="mt-1 text-xs text-rose-500">{createForm.errors.nom}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Description <span className="font-normal text-slate-400">(optionnelle)</span>
                </label>
                <textarea
                  rows={3}
                  value={createForm.data.description}
                  onChange={(event) => createForm.setData('description', event.target.value)}
                  className={`w-full resize-none rounded-xl border px-4 py-2.5 outline-none transition-all focus:ring-4 ${
                    createForm.errors.description
                      ? 'border-rose-300 focus:ring-rose-50'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-50'
                  }`}
                  placeholder="Description de la categorie..."
                />
                {createForm.errors.description && (
                  <p className="mt-1 text-xs text-rose-500">{createForm.errors.description}</p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeCreate}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 font-semibold text-slate-600 transition-all hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={createForm.processing}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 font-semibold text-white transition-all hover:bg-slate-800 disabled:opacity-50"
                >
                  {createForm.processing ? 'Envoi...' : (
                    <>
                      <Save size={18} /> Enregistrer
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <h2 className="font-bold text-slate-800">Modifier la categorie</h2>
              <button type="button" onClick={closeEdit} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={submitEdit} className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Nom</label>
                <input
                  autoFocus
                  type="text"
                  value={editForm.data.nom}
                  onChange={(event) => editForm.setData('nom', event.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 outline-none transition-all focus:ring-4 ${
                    editForm.errors.nom
                      ? 'border-rose-300 focus:ring-rose-50'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-50'
                  }`}
                  placeholder="Nom de la categorie..."
                />
                {editForm.errors.nom && <p className="mt-1 text-xs text-rose-500">{editForm.errors.nom}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Description <span className="font-normal text-slate-400">(optionnelle)</span>
                </label>
                <textarea
                  rows={3}
                  value={editForm.data.description}
                  onChange={(event) => editForm.setData('description', event.target.value)}
                  className={`w-full resize-none rounded-xl border px-4 py-2.5 outline-none transition-all focus:ring-4 ${
                    editForm.errors.description
                      ? 'border-rose-300 focus:ring-rose-50'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-50'
                  }`}
                  placeholder="Description de la categorie..."
                />
                {editForm.errors.description && (
                  <p className="mt-1 text-xs text-rose-500">{editForm.errors.description}</p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEdit}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 font-semibold text-slate-600 transition-all hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={editForm.processing}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white transition-all hover:bg-indigo-700 disabled:opacity-50"
                >
                  {editForm.processing ? 'Envoi...' : (
                    <>
                      <Save size={18} /> Mettre a jour
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

CategoriesPage.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
