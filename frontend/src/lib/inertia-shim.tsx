// Compatibilité avec l'API @inertiajs/react utilisée dans les pages existantes.
// Objectif : migrer une page en changeant seulement son import
//   import { Link, useForm } from '@inertiajs/react'
//   -> import { Link, useForm } from '@/lib/inertia-shim'
// sans réécrire toute la logique du formulaire.
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, type LinkProps as RouterLinkProps } from 'react-router-dom';
import { api, ensureCsrfCookie, extractValidationErrors } from './api';
import { useAuth } from '../context/AuthContext';

type LinkProps = Omit<RouterLinkProps, 'to'> & { href: string };

export function Link({ href, ...rest }: LinkProps) {
    return <RouterLink to={href} {...rest} />;
}

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

type UseFormOptions = {
    onSuccess?: (data: unknown) => void;
    onError?: (errors: Record<string, string>) => void;
    onFinish?: () => void;
    preserveState?: boolean;
    preserveScroll?: boolean;
    replace?: boolean;
    only?: string[];
    forceFormData?: boolean;
};

type AdminPageData = Record<string, unknown>;

const emptyPaginator = {
    data: [],
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
    from: null,
    to: null,
};

const adminPageDefaults: Record<string, AdminPageData> = {
    '/admin': {
        stats: {
            orders_today: 0,
            monthly_revenue: 0,
            active_clients: 0,
            pending_total: 0,
            pending_reviews: 0,
            pending_messages: 0,
            pending_orders: 0,
        },
        chartData: { monthly: [] },
        recentOrders: [],
    },
    '/admin/produits': { produits: emptyPaginator, filters: {} },
    '/admin/articles': { articles: emptyPaginator, categories: [], filters: {} },
    '/admin/categories': { categories: emptyPaginator, flash: {} },
    '/admin/clients': { clients: emptyPaginator, filters: {} },
    '/admin/commandes': { commandes: emptyPaginator, filters: {} },
    '/admin/avis': { avis: emptyPaginator, filters: {} },
    '/admin/messages': { messages: emptyPaginator, filters: {} },
    '/admin/notifications': { notifications: [], summary: {} },
    '/admin/parametres': {
        settings: { company_name: 'Diary', company_address: 'Antananarivo, Madagascar' },
        email: '',
    },
};

const adminPageCache = new Map<string, AdminPageData>();
const adminPageRequests = new Map<string, Promise<AdminPageData>>();

function adminPageKey(path: string, search: string) {
    return `${path}${search}`;
}

function shapeAdminPageData(path: string, response: unknown, params: Record<string, unknown> = {}) {
    const data = response && typeof response === 'object' ? response as AdminPageData : {};
    const filters = { ...params };
    const paginatorKey: Record<string, string> = {
        '/admin/produits': 'produits',
        '/admin/articles': 'articles',
        '/admin/categories': 'categories',
        '/admin/clients': 'clients',
        '/admin/commandes': 'commandes',
        '/admin/avis': 'avis',
        '/admin/messages': 'messages',
    };
    const key = paginatorKey[path];

    if (!key) return data;
    const result = data[key] ?? data;

    return {
        ...data,
        [key]: result,
        filters: data.filters ?? filters,
    };
}

function notifyAdminPageUpdate() {
    window.dispatchEvent(new Event('diary-admin-refresh'));
}

function notifyAdminPageDataUpdated() {
    window.dispatchEvent(new Event('diary-admin-data-updated'));
}

function requestAdminPage(path: string, search: string, params: Record<string, unknown> = {}) {
    const key = adminPageKey(path, search);
    const cached = adminPageCache.get(key);
    if (cached) return Promise.resolve(cached);

    const pending = adminPageRequests.get(key);
    if (pending) return pending;

    const query = Object.fromEntries(new URLSearchParams(search));
    const request = api.get(`/api${path}`, { params: { ...query, ...params } })
        .then(({ data }) => {
            const pageData = shapeAdminPageData(path, data, { ...query, ...params });
            adminPageCache.set(key, pageData);
            return pageData;
        })
        .finally(() => {
            adminPageRequests.delete(key);
        });

    adminPageRequests.set(key, request);
    return request;
}

function apiUrl(url: string) {
    return url.startsWith('/admin') ? `/api${url}` : url;
}

function requestWithData(
    method: Method,
    url: string,
    data: Record<string, unknown> = {},
    forceFormData = false,
) {
    const fileUpload = forceFormData || Object.values(data).some((value) => value instanceof File);
    if (!fileUpload) {
        return method === 'get'
            ? api.get(apiUrl(url), { params: data })
            : api[method](apiUrl(url), data);
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            formData.append(key, value instanceof File ? value : String(value));
        }
    });

    if (method === 'put' || method === 'patch' || method === 'delete') {
        formData.append('_method', method.toUpperCase());
        return api.post(apiUrl(url), formData);
    }

    return api[method](apiUrl(url), formData);
}

// Reproduit la forme de useForm() d'Inertia : data/setData/post/put/patch/delete
// /processing/errors/reset, mais exécute une requête axios classique.
export function useForm<T extends Record<string, unknown>>(initialData: T) {
    const [data, setDataState] = useState<T>(initialData);
    const [transformData, setTransformData] = useState<(formData: T) => Record<string, unknown>>(
        () => (formData: T) => formData,
    );
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const setData = useCallback(
        (key: keyof T | Partial<T>, value?: unknown) => {
            if (typeof key === 'object') {
                setDataState((prev) => ({ ...prev, ...key }));
            } else {
                setDataState((prev) => ({ ...prev, [key]: value }));
            }
        },
        [],
    );

    const submit = useCallback(
        async (method: Method, url: string, options: UseFormOptions = {}) => {
            setProcessing(true);
            setErrors({});
            try {
                await ensureCsrfCookie();
                const response = await requestWithData(
                    method,
                    url,
                    transformData(data),
                    options.forceFormData,
                );
                options.onSuccess?.(response.data);
                if (url.startsWith('/admin') && method !== 'get') notifyAdminPageUpdate();
            } catch (error) {
                const fieldErrors = extractValidationErrors(error);
                setErrors(fieldErrors);
                options.onError?.(fieldErrors);
                throw error;
            } finally {
                setProcessing(false);
                options.onFinish?.();
            }
        },
        [data, transformData],
    );

    const reset = useCallback((...keys: (keyof T)[]) => {
        if (keys.length === 0) {
            setDataState(initialData);
            return;
        }
        setDataState((prev) => {
            const next = { ...prev };
            keys.forEach((k) => {
                next[k] = initialData[k];
            });
            return next;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const clearErrors = useCallback(() => setErrors({}), []);

    return {
        data,
        setData,
        transform: (callback: (formData: T) => Record<string, unknown>) => {
            setTransformData(() => callback);
        },
        errors,
        processing,
        reset,
        clearErrors,
        get: (url: string, options?: UseFormOptions) => submit('get', url, options),
        post: (url: string, options?: UseFormOptions) => submit('post', url, options),
        put: (url: string, options?: UseFormOptions) => submit('put', url, options),
        patch: (url: string, options?: UseFormOptions) => submit('patch', url, options),
        delete: (url: string, options?: UseFormOptions) => submit('delete', url, options),
    };
}

// Remplace le router.visit()/router.get() d'Inertia pour les navigations
// programmatiques (redirections après action, etc.)
export function useInertiaRouter() {
    const navigate = useNavigate();
    return {
        visit: (url: string) => navigate(url),
        get: (url: string) => navigate(url),
    };
}

// --- Head -------------------------------------------------------------
// Remplace <Head title="..."><meta .../></Head> d'Inertia (qui gérait le
// <head> côté SSR). Ici on met juste à jour document.title côté client.
type HeadProps = { title?: string; children?: React.ReactNode };
export function Head({ title }: HeadProps) {
    useEffect(() => {
        if (title) document.title = title;
    }, [title]);
    return null;
}

// --- router -------------------------------------------------------------
// Objet global façon Inertia (router.visit/get/post/put/delete/reload),
// utilisable en dehors des composants (ex: dans un handler onClick).
// La navigation SPA réelle est branchée via setRouterNavigate() (voir App.tsx).
let _navigate: ((url: string) => void) | null = null;
export function setRouterNavigate(fn: (url: string) => void) {
    _navigate = fn;
}

async function routerRequest(method: Method, url: string, data?: Record<string, unknown>, options: UseFormOptions = {}) {
    try {
        await ensureCsrfCookie();
        const response = await requestWithData(method, url, data);
        options.onSuccess?.(response.data);
        if (url.startsWith('/admin') && method === 'get') {
            const path = url.split('?')[0];
            const query = url.includes('?') ? `?${url.split('?')[1]}` : '';
            const key = adminPageKey(path, query);
            adminPageCache.set(key, shapeAdminPageData(path, response.data, data));
            notifyAdminPageDataUpdated();
        } else if (url.startsWith('/admin') && method !== 'get') {
            notifyAdminPageUpdate();
        }
        return response.data;
    } catch (error) {
        options.onError?.(extractValidationErrors(error));
        throw error;
    } finally {
        options.onFinish?.();
    }
}

export const router = {
    visit: (url: string) => (_navigate ? _navigate(url) : (window.location.href = url)),
    get: (url: string, data?: Record<string, unknown>, options?: UseFormOptions) => routerRequest('get', url, data, options),
    post: (url: string, data?: Record<string, unknown>, options?: UseFormOptions) => routerRequest('post', url, data, options),
    put: (url: string, data?: Record<string, unknown>, options?: UseFormOptions) => routerRequest('put', url, data, options),
    patch: (url: string, data?: Record<string, unknown>, options?: UseFormOptions) => routerRequest('patch', url, data, options),
    delete: (url: string, options?: UseFormOptions) => routerRequest('delete', url, undefined, options),
    reload: () => window.location.reload(),
};

// --- usePage --------------------------------------------------------------
// Fournit les données globales partagées et charge les props des pages admin
// depuis leurs endpoints JSON; les pages publiques gèrent leur propre chargement.
export function usePage<T extends Record<string, unknown> = Record<string, unknown>>() {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => localStorage.getItem('sidebar_state') !== 'false');
    const path = window.location.pathname;
    const search = window.location.search;
    const key = adminPageKey(path, search);
    const [adminData, setAdminData] = useState<AdminPageData>(() =>
        adminPageCache.get(key) ?? adminPageDefaults[path] ?? {},
    );
    const [adminPageError, setAdminPageError] = useState<string | null>(null);
    const [adminPageLoading, setAdminPageLoading] = useState(path.startsWith('/admin'));

    useEffect(() => {
        localStorage.setItem('sidebar_state', String(sidebarOpen));
    }, [sidebarOpen]);

    useEffect(() => {
        if (!path.startsWith('/admin')) return;
        let active = true;

        const load = () => {
            setAdminPageLoading(true);
            setAdminPageError(null);
            requestAdminPage(path, search)
                .then((pageData) => {
                    if (active) setAdminData(pageData);
                })
                .catch(() => {
                    if (active) {
                        setAdminPageError('Impossible de charger les données administratives. Vérifiez votre connexion et vos droits.');
                    }
                })
                .finally(() => {
                    if (active) setAdminPageLoading(false);
                });
        };

        const refresh = () => {
            adminPageCache.delete(key);
            load();
        };
        const updateFromCache = () => {
            const updatedData = adminPageCache.get(key);
            if (updatedData) {
                setAdminData(updatedData);
                setAdminPageError(null);
                setAdminPageLoading(false);
            }
        };

        load();
        window.addEventListener('diary-admin-refresh', refresh);
        window.addEventListener('diary-admin-data-updated', updateFromCache);

        return () => {
            active = false;
            window.removeEventListener('diary-admin-refresh', refresh);
            window.removeEventListener('diary-admin-data-updated', updateFromCache);
        };
    }, [key, path, search]);

    return {
        props: {
            auth: { user },
            name: 'Diary Madagascar',
            sidebarOpen,
            setSidebarOpen,
            ...(adminPageCache.get(key) ?? adminData),
        } as unknown as T,
        url: window.location.pathname + window.location.search,
        error: adminPageError,
        loading: adminPageLoading,
    };
}

// --- Form -------------------------------------------------------------
// Remplace <Form action="/login" method="post">{(fp) => ...}</Form>.
// `children` doit être une render-prop comme avec Inertia v2.
type FormRenderProps = {
    processing: boolean;
    errors: Record<string, string>;
    wasSuccessful: boolean;
    recentlySuccessful: boolean;
};
type FormProps = {
    action: string;
    method?: Method;
    children: (fp: FormRenderProps) => React.ReactNode;
    onSuccess?: (data: unknown) => void;
    onError?: (errors: Record<string, string>) => void;
    resetOnSuccess?: boolean;
    className?: string;
};
export function Form({ action, method = 'post', children, onSuccess, onError, className }: FormProps) {
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [wasSuccessful, setWasSuccessful] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        setWasSuccessful(false);
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        try {
            await ensureCsrfCookie();
            const response = method === 'get' ? await api.get(action, { params: formData }) : await api[method](action, formData);
            setWasSuccessful(true);
            onSuccess?.(response.data);
        } catch (error) {
            const fieldErrors = extractValidationErrors(error);
            setErrors(fieldErrors);
            onError?.(fieldErrors);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={className}>
            {children({ processing, errors, wasSuccessful, recentlySuccessful: wasSuccessful })}
        </form>
    );
}

// Type conservé pour compat avec `import type { InertiaLinkProps }`.
export type InertiaLinkProps = LinkProps;
