import { Component, lazy, Suspense, useEffect, type ErrorInfo, type ReactNode } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { setRouterNavigate } from './lib/inertia-shim';

// Chargement paresseux : chaque page ne charge son bundle que si elle est visitée.
const Home = lazy(() => import('./pages/Home'));
const Catalogue = lazy(() => import('./pages/Catalogue'));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then((m) => ({ default: m.ProductDetailPage })));
const About = lazy(() => import('./pages/about'));
const Engagement = lazy(() => import('./pages/engagement'));
const Contact = lazy(() => import('./pages/contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Checkout = lazy(() => import('./pages/Checkout'));
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogShow = lazy(() => import('./pages/BlogShow'));
const AccountOrders = lazy(() => import('./pages/AccountOrders'));

const Login = lazy(() => import('./pages/auth/login'));
const Register = lazy(() => import('./pages/auth/register'));
const ForgotPassword = lazy(() => import('./pages/auth/forgot-password'));
const ResetPassword = lazy(() => import('./pages/auth/reset-password'));
const TwoFactorChallenge = lazy(() => import('./pages/auth/two-factor-challenge'));
const VerifyEmail = lazy(() => import('./pages/auth/verify-email'));
const ConfirmPassword = lazy(() => import('./pages/auth/confirm-password'));

const SettingsProfile = lazy(() => import('./pages/settings/profile'));
const SettingsPassword = lazy(() => import('./pages/settings/password'));
const SettingsAppearance = lazy(() => import('./pages/settings/appearance'));
const SettingsTwoFactor = lazy(() => import('./pages/settings/two-factor'));

const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminArticles = lazy(() => import('./pages/admin/Articles'));
const AdminCategories = lazy(() => import('./pages/admin/Categories'));
const AdminClients = lazy(() => import('./pages/admin/Clients'));
const AdminMessages = lazy(() => import('./pages/admin/Messages'));
const AdminNotifications = lazy(() => import('./pages/admin/Notifications'));
const AdminOrders = lazy(() => import('./pages/admin/Orders'));
const AdminProducts = lazy(() => import('./pages/admin/Products'));
const AdminReviews = lazy(() => import('./pages/admin/Reviews'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));

class PageErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('Une page n’a pas pu être affichée.', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0a0a0a] px-4 text-center text-white">
                    <p role="alert">Cette page a rencontré une erreur et ne peut pas s’afficher.</p>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="rounded-full bg-gold px-5 py-2 font-semibold text-black"
                    >
                        Recharger la page
                    </button>
                </main>
            );
        }
        return this.props.children;
    }
}

function RequireAuth({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;
    return <>{children}</>;
}

function RequireAdmin({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (!user) return <Navigate to="/login?redirect_to=%2Fadmin" replace />;
    if (user.role !== 'admin') return <Navigate to="/" replace />;
    return <>{children}</>;
}

export default function App() {
    const navigate = useNavigate();
    useEffect(() => {
        setRouterNavigate(navigate);
    }, [navigate]);

    return (
        <PageErrorBoundary>
        <Suspense fallback={
            <div role="status" className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-sm text-white/70">
                Chargement de la page…
            </div>
        }>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogue" element={<Catalogue />} />
                <Route path="/produit/:id" element={<ProductDetail />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/nos-engagements" element={<Engagement />} />
                <Route path="/nous-contacter" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/actualites" element={<BlogIndex />} />
                <Route path="/actualites/:slug" element={<BlogShow />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/two-factor-challenge" element={<TwoFactorChallenge />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/confirm-password" element={<ConfirmPassword />} />

                <Route
                    path="/compte/commandes"
                    element={
                        <RequireAuth>
                            <AccountOrders />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/settings/profile"
                    element={
                        <RequireAuth>
                            <SettingsProfile />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/settings/password"
                    element={
                        <RequireAuth>
                            <SettingsPassword />
                        </RequireAuth>
                    }
                />
                <Route path="/settings/appearance" element={<SettingsAppearance />} />
                <Route
                    path="/settings/two-factor"
                    element={
                        <RequireAuth>
                            <SettingsTwoFactor />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <RequireAdmin>
                            <AdminDashboard />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/articles"
                    element={
                        <RequireAdmin>
                            <AdminArticles />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/categories"
                    element={
                        <RequireAdmin>
                            <AdminCategories />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/clients"
                    element={
                        <RequireAdmin>
                            <AdminClients />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/messages"
                    element={
                        <RequireAdmin>
                            <AdminMessages />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/notifications"
                    element={
                        <RequireAdmin>
                            <AdminNotifications />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/commandes"
                    element={
                        <RequireAdmin>
                            <AdminOrders />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/produits"
                    element={
                        <RequireAdmin>
                            <AdminProducts />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/avis"
                    element={
                        <RequireAdmin>
                            <AdminReviews />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/parametres"
                    element={
                        <RequireAdmin>
                            <AdminSettings />
                        </RequireAdmin>
                    }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
        </PageErrorBoundary>
    );
}
