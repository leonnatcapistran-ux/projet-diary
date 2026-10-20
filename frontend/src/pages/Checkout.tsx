import { Link, router, usePage } from '../lib/inertia-shim';
import { ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PublicLayout from '../components/public-layout';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/types';

interface CheckoutProps {
  cart?: CartItem[];
  total?: number;
}

type CheckoutUser = {
  nom?: string | null;
  prenom?: string | null;
  email?: string | null;
  telephone?: string | null;
  adresse?: string | null;
  pays_residence?: string | null;
};

type CheckoutDraft = {
  nom: string;
  prenom: string;
  email_valide: string;
  num_telephone: string;
  adresse_livraison: string;
  pays_livraison: string;
  mode_transport: 'maritime' | 'aerien' | '';
};

type CheckoutFieldErrors = Partial<Record<keyof CheckoutDraft, string>>;

const CHECKOUT_DRAFT_KEY = 'diary_checkout_draft';

const emptyDraft: CheckoutDraft = {
  nom: '',
  prenom: '',
  email_valide: '',
  num_telephone: '',
  adresse_livraison: '',
  pays_livraison: '',
  mode_transport: '',
};

const getStoredDraft = (): Partial<CheckoutDraft> => {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.localStorage.getItem(CHECKOUT_DRAFT_KEY);
    return raw ? JSON.parse(raw) as Partial<CheckoutDraft> : {};
  } catch {
    return {};
  }
};

const buildInitialDraft = (user?: CheckoutUser): CheckoutDraft => {
  const stored = getStoredDraft();

  return {
    ...emptyDraft,
    ...stored,
    nom: stored.nom ?? user?.nom ?? '',
    prenom: stored.prenom ?? user?.prenom ?? '',
    email_valide: stored.email_valide ?? user?.email ?? '',
    num_telephone: stored.num_telephone ?? user?.telephone ?? '',
    adresse_livraison: stored.adresse_livraison ?? user?.adresse ?? '',
    pays_livraison: stored.pays_livraison ?? user?.pays_residence ?? '',
    mode_transport: stored.mode_transport ?? '',
  };
};

const CheckoutContent: React.FC<CheckoutProps> = ({ cart, total }) => {
  const { cart: contextCart, cartTotal, clearCart } = useCart();
  const safeCart = contextCart.length ? contextCart : (cart ?? []);
  const safeTotal = contextCart.length ? cartTotal : (total ?? 0);
  const hasPricedItems = safeCart.some((item) => item.price !== null && item.price > 0);
  const { flash, auth } = usePage<{ flash?: { success?: string; info?: string }, auth?: { user?: CheckoutUser } }>().props;
  const [isSuccess, setIsSuccess] = React.useState(Boolean(flash?.success));
  const [formData, setFormData] = useState<CheckoutDraft>(() => buildInitialDraft(auth?.user));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<CheckoutFieldErrors>({});

  useEffect(() => {
    if (flash?.success) {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(CHECKOUT_DRAFT_KEY);
      }
    }
  }, [flash?.success]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const updateField = <K extends keyof CheckoutDraft>(field: K, value: CheckoutDraft[K]) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
    setFieldErrors((current) => {
      if (!current[field]) return current;

      return {
        ...current,
        [field]: undefined,
      };
    });
  };

  const inputClassName = (field: keyof CheckoutDraft) =>
    `w-full rounded-2xl p-4 text-sm text-black ${fieldErrors[field] ? 'border border-red-500 bg-red-50' : 'border-none bg-gray-200'}`;

  const loginHref = useMemo(() => `/login?redirect_to=${encodeURIComponent('/checkout')}`, []);
  const registerHref = useMemo(() => `/register?redirect_to=${encodeURIComponent('/checkout')}`, []);

  const handleSubmit = () => {
    setSubmitError(null);
    setFieldErrors({});

    if (safeCart.length === 0) {
      setSubmitError('Votre panier est vide.');
      return;
    }

    const clientFieldErrors: CheckoutFieldErrors = {};

    if (!formData.nom.trim()) clientFieldErrors.nom = 'Veuillez renseigner votre nom.';
    if (!formData.prenom.trim()) clientFieldErrors.prenom = 'Veuillez renseigner votre prenom.';
    if (!formData.email_valide.trim()) clientFieldErrors.email_valide = 'Veuillez renseigner votre adresse e-mail.';
    if (!formData.num_telephone.trim()) clientFieldErrors.num_telephone = 'Veuillez renseigner votre numero de telephone.';
    if (!formData.adresse_livraison.trim()) clientFieldErrors.adresse_livraison = 'Veuillez indiquer une adresse de livraison.';
    if (!formData.pays_livraison.trim()) clientFieldErrors.pays_livraison = 'Veuillez indiquer le pays de livraison.';

    if (Object.keys(clientFieldErrors).length > 0) {
      setFieldErrors(clientFieldErrors);
      setSubmitError('Corrigez les champs en erreur avant d\'envoyer la commande.');
      return;
    }

    if (!auth?.user) {
      setSubmitError('Connectez-vous ou creez un compte pour finaliser cette commande.');
      return;
    }

    const items = safeCart
      .map((item) => ({
        id_produit: Number(item.id),
        quantite_kg: item.quantity * (item.poids_unitaire_kg ?? 1.0),
      }))
      .filter((item) => Number.isFinite(item.id_produit) && item.id_produit > 0 && item.quantite_kg > 0);

    if (items.length !== safeCart.length) {
      setSubmitError('Un produit du panier est invalide. Supprimez-le puis recommencez.');
      return;
    }

    setIsSubmitting(true);
    router.post(
      '/commandes',
      {
        nom: formData.nom,
        prenom: formData.prenom,
        items,
        adresse_livraison: formData.adresse_livraison,
        pays_livraison: formData.pays_livraison,
        mode_transport: formData.mode_transport || null,
        num_telephone: formData.num_telephone,
        email_valide: formData.email_valide,
        type_achat: 'standard',
      },
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          setIsSuccess(true);
          clearCart();
        },
        onError: (errors) => {
          setFieldErrors(errors as CheckoutFieldErrors);
          const firstError = Object.values(errors)[0];
          setSubmitError(
            typeof firstError === 'string'
              ? firstError
              : 'Impossible d\'envoyer la commande. Verifiez vos informations.',
          );
        },
        onFinish: () => setIsSubmitting(false),
      }
    );
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite p-6">
        <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <CheckCircle size={48} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-forest serif mb-4">Commande confirmee</h1>
            <p className="text-forest/60">Merci pour votre confiance. Votre commande a ete transmise. L&apos;admin vous enverra le prix et la facture.</p>
          </div>
          <Link href="/" className="inline-block bg-forest text-offwhite px-10 py-4 rounded-full font-bold shadow-xl hover:bg-forest/90 transition-all">
            Retour a l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-offwhite min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12 mt-10">
          <Link href="/" title="Retour a l'accueil" className="p-2 bg-white rounded-full text-forest hover:text-brick transition-colors shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-forest serif">
            {hasPricedItems ? 'Paiement securise' : 'Finaliser votre demande'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-forest/5">
              <div className="flex items-center gap-4 mb-10">
                <div className="flex-grow h-[1px] bg-forest/10" />
              </div>

              <div className="space-y-6 gap-2">
                <h2 className="text-xl font-bold serif text-center mb-6 text-forest">Veuillez remplir le formulaire</h2>
              </div>

              <div className="flex-grow h-[1px] bg-forest/10 mt-10 mb-10" />

              {flash?.info && auth?.user && (
                <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 px-5 py-4 text-sm text-sky-900">
                  {flash.info}
                </div>
              )}

              {!auth?.user ? (
                <div className="rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-8 text-center text-amber-900">
                  <p className="text-lg font-semibold">Connexion requise pour continuer</p>
                  <p className="mt-3 text-sm leading-6 text-amber-800/80">
                    Connectez-vous ou creez un compte pour finaliser la commande. Vos produits selectionnes restent dans le panier
                    et vos informations de commande seront restaurees au retour sur cette page.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Link
                      href={loginHref}
                      className="inline-flex rounded-full bg-forest px-6 py-3 text-sm font-semibold text-offwhite"
                    >
                      Se connecter
                    </Link>
                    <Link
                      href={registerHref}
                      className="inline-flex rounded-full border border-forest/15 px-6 py-3 text-sm font-semibold text-forest"
                    >
                      Creer un compte
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="md:grid md:grid-cols-2 gap-4 flex flex-wrap">
                    <input
                      type="text"
                      placeholder="Nom..."
                      value={formData.nom}
                      onChange={(e) => updateField('nom', e.target.value)}
                      className={inputClassName('nom')}
                    />
                    {fieldErrors.nom && <p className="mt-2 text-sm text-red-600">{fieldErrors.nom}</p>}
                    <input
                      type="text"
                      placeholder="Prenom..."
                      value={formData.prenom}
                      onChange={(e) => updateField('prenom', e.target.value)}
                      className={inputClassName('prenom')}
                    />
                    {fieldErrors.prenom && <p className="mt-2 text-sm text-red-600">{fieldErrors.prenom}</p>}
                  </div>
                  <input
                    type="email"
                    placeholder="Email valide..."
                    value={formData.email_valide}
                    onChange={(e) => updateField('email_valide', e.target.value)}
                    className={inputClassName('email_valide')}
                  />
                  {fieldErrors.email_valide && <p className="mt-2 text-sm text-red-600">{fieldErrors.email_valide}</p>}
                  <input
                    type="tel"
                    placeholder="Numero de telephone..."
                    value={formData.num_telephone}
                    onChange={(e) => updateField('num_telephone', e.target.value)}
                    className={inputClassName('num_telephone')}
                  />
                  {fieldErrors.num_telephone && <p className="mt-2 text-sm text-red-600">{fieldErrors.num_telephone}</p>}
                  <input
                    type="text"
                    placeholder="Adresse complete..."
                    value={formData.adresse_livraison}
                    onChange={(e) => updateField('adresse_livraison', e.target.value)}
                    className={inputClassName('adresse_livraison')}
                  />
                  {fieldErrors.adresse_livraison && <p className="mt-2 text-sm text-red-600">{fieldErrors.adresse_livraison}</p>}
                  <input
                    type="text"
                    placeholder="Pays de livraison..."
                    value={formData.pays_livraison}
                    onChange={(e) => updateField('pays_livraison', e.target.value)}
                    className={inputClassName('pays_livraison')}
                  />
                  {fieldErrors.pays_livraison && <p className="mt-2 text-sm text-red-600">{fieldErrors.pays_livraison}</p>}
                  <select
                    value={formData.mode_transport}
                    onChange={(e) => updateField('mode_transport', e.target.value as CheckoutDraft['mode_transport'])}
                    title="Selectionner le mode de transport"
                    className={inputClassName('mode_transport')}
                  >
                    <option value="">Mode de transport</option>
                    <option value="maritime">Maritime</option>
                    <option value="aerien">Aerien</option>
                  </select>
                  {fieldErrors.mode_transport && <p className="mt-2 text-sm text-red-600">{fieldErrors.mode_transport}</p>}
                  {submitError && <p className="text-sm text-red-600">{submitError}</p>}
                  <button
                    className="w-full bg-forest/95 text-offwhite py-4 rounded-full hover:bg-forest hover:cursor-pointer disabled:opacity-60"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    Envoyer la demande
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-forest/5">
              <h2 className="text-xl font-bold text-forest serif mb-8">Resume de la commande</h2>
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                {safeCart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-beige rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-forest text-sm">{item.name}</p>
                        <p className="text-[10px] text-forest/40 uppercase tracking-widest">Qte: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-forest">
                      {item.price !== null && item.price > 0
                        ? `${((item.price ?? 0) * item.quantity).toFixed(2)} EUR`
                        : 'Prix a confirmer'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-forest/5 space-y-4">
                <div className="flex justify-between text-forest/60 text-sm">
                  <span>Sous-total</span>
                  <span>{hasPricedItems ? `${safeTotal.toFixed(2)} EUR` : 'Prix a confirmer'}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-forest serif pt-4">
                  <span>Total</span>
                  <span>{hasPricedItems ? `${safeTotal.toFixed(2)} EUR` : 'Prix a confirmer'}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 text-forest/40">
              <ShieldCheck size={20} />
              <p className="text-[10px] uppercase tracking-widest font-bold">Paiement securise et crypte</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout: React.FC<CheckoutProps> = (props) => {
  return (
    <PublicLayout>
      <CheckoutContent {...props} />
    </PublicLayout>
  );
};

export default Checkout;
