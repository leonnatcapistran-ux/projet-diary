import { usePage } from '../../lib/inertia-shim';
import { router } from '../../lib/inertia-shim';
import { Building2, Info, MapPin, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTopbar from "@/components/admin/AdminTopbar";

type SettingsPageProps = {
  settings: {
    company_name: string;
    company_address: string;
  };
  email?: string;
};

const SettingsPage = () => {
  const { settings, email = "", flash } = usePage<SettingsPageProps & { flash?: { success?: string; error?: string } }>().props;
  const [adminEmail, setAdminEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(flash?.success || "");
  const [errorMessage, setErrorMessage] = useState(flash?.error || "");

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        // Rediriger vers la page de connexion après 3 secondes
        window.location.href = "/login";
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSave = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    // Validation
    if (!adminEmail) {
      setErrorMessage("L'adresse e-mail est requise");
      return;
    }

    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        setErrorMessage("Les mots de passe ne correspondent pas");
        return;
      }
      if (password.length < 6) {
        setErrorMessage("Le mot de passe doit contenir au moins 6 caractères");
        return;
      }
    }

    setIsLoading(true);

    router.post(
      "/admin/parametres",
      {
        email: adminEmail,
        mot_de_passe: password || null,
        mot_de_passe_confirmation: confirmPassword || null,
      },
      {
        onSuccess: () => {
          setPassword("");
          setConfirmPassword("");
          setSuccessMessage("Modifications enregistrées avec succès! Redirection vers la connexion...");
        },
        onError: (errors: Record<string, string>) => {
          console.error("Erreurs de validation:", errors);
          const errorMessages = Object.values(errors).join("\n");
          setErrorMessage(errorMessages || "Une erreur est survenue");
        },
        onFinish: () => {
          setIsLoading(false);
        },
      }
    );
  };

  const handleCancel = () => {
    setAdminEmail(email);
    setPassword("");
    setConfirmPassword("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <AdminLayout>
      <AdminTopbar title="Parametres" />

      {successMessage && (
        <div className="mb-6 rounded-2xl bg-green-50 border border-green-200 px-5 py-4 flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          <p className="text-sm font-medium text-green-800">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 px-5 py-4 flex items-center gap-3">
          <div className="h-5 w-5 bg-red-600 rounded-full flex-shrink-0" />
          <p className="text-sm font-medium text-red-800">{errorMessage}</p>
        </div>
      )}

      <div className="max-w-4xl space-y-6">
        <div className="kpi-card">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Informations generales</h2>
              <p className="text-sm text-muted-foreground">
                Donnees d identification actuellement utilisees par le back-office.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background px-4 py-4">
              <div className="mb-1 text-sm text-muted-foreground">Nom de l entreprise</div>
              <div className="font-medium text-foreground">{settings.company_name}</div>
            </div>

            <div className="rounded-2xl border border-border bg-background px-4 py-4">
              <div className="mb-1 text-sm text-muted-foreground">Adresse</div>
              <div className="font-medium text-foreground">{settings.company_address}</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-dashed border-border bg-background px-5 py-5">
          <div className="mb-3 flex items-center gap-2 text-foreground">
            <Info className="h-4 w-4" />
            <span className="font-medium">Perimetre actuel</span>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Cette page reste volontairement simple pour l instant. Elle affiche seulement les informations
              deja definies dans l application.
            </p>
            <p>
              Les modules plus avances comme la gestion complete des administrateurs ou les preferences d email
              pourront etre etendus plus tard sans reintroduire les modules retires de Diary.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background px-4 py-4">
            <div className="mb-2 flex items-center gap-2 text-foreground">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">Utilite de cette page</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Donner un point de repere clair aux admins, sans exposer des reglages non finalises ou trompeurs.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background px-4 py-4">
            <div className="mb-2 flex items-center gap-2 text-foreground">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">Evolution future</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Si besoin plus tard, on pourra y ajouter une vraie edition des parametres a partir d une source de
              configuration persistante.
            </p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Mon compte</h2>
              <p className="text-sm text-muted-foreground">
                Modifiez les informations de votre compte administrateur.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Adresse e-mail</label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="adresse@exemple.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Nouveau mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Nouveau mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Confirmer le mot de passe</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Confirmer le mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="rounded-2xl border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Annuler
              </button>
              <button 
                type="button"
                onClick={handleSave}
                disabled={isLoading}
                className="rounded-2xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
