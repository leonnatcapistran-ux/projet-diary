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
};

// Reproduit la forme de useForm() d'Inertia : data/setData/post/put/patch/delete
// /processing/errors/reset, mais exécute une requête axios classique.
export function useForm<T extends Record<string, unknown>>(initialData: T) {
    const [data, setDataState] = useState<T>(initialData);
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
                const response =
                    method === 'get'
                        ? await api.get(url, { params: data })
                        : await api[method](url, data);
                options.onSuccess?.(response.data);
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
        [data],
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
        const response = method === 'get' ? await api.get(url, { params: data }) : await api[method](url, data ?? {});
        options.onSuccess?.(response.data);
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
// Ne fournit plus les props par page (celles-ci viennent maintenant d'un
// fetch fait par la page elle-même, cf. pages/Catalogue.tsx). Fournit en
// revanche les données globales équivalentes aux "shared props" Inertia :
// auth.user, name (nom de l'appli), sidebarOpen. Étends `extraProps` au
// besoin pour une page précise plutôt que de tout réécrire.
export function usePage<T extends Record<string, unknown> = Record<string, unknown>>() {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => localStorage.getItem('sidebar_state') !== 'false');

    useEffect(() => {
        localStorage.setItem('sidebar_state', String(sidebarOpen));
    }, [sidebarOpen]);

    return {
        props: {
            auth: { user },
            name: 'Diary Madagascar',
            sidebarOpen,
            setSidebarOpen,
        } as unknown as T,
        url: window.location.pathname + window.location.search,
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
