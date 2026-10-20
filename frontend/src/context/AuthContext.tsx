import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, ensureCsrfCookie } from '../lib/api';

export type AuthUser = {
    id_user: number;
    nom: string;
    prenom: string;
    email: string;
    role?: string;
    [key: string]: unknown;
} | null;

type AuthContextValue = {
    user: AuthUser;
    loading: boolean;
    refresh: () => Promise<AuthUser>;
    login: (email: string, password: string, remember?: boolean) => Promise<void>;
    register: (payload: Record<string, unknown>) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser>(null);
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(async (): Promise<AuthUser> => {
        try {
            const { data } = await api.get('/api/user');
            setUser(data);
            return data;
        } catch {
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const login = useCallback(async (email: string, password: string, remember = false) => {
        await ensureCsrfCookie();
        await api.post('/login', { email, password, remember });
        await refresh();
    }, [refresh]);

    const register = useCallback(async (payload: Record<string, unknown>) => {
        await ensureCsrfCookie();
        await api.post('/register', payload);
        await refresh();
    }, [refresh]);

    const logout = useCallback(async () => {
        await ensureCsrfCookie();
        await api.post('/logout');
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, refresh, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
    return ctx;
}
