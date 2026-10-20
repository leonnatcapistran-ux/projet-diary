import axios from 'axios';

// URL du backend Laravel. En dev : http://localhost:8000
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // envoie/reçoit le cookie de session Sanctum
    withXSRFToken: true, // lit XSRF-TOKEN et l'ajoute automatiquement en header
    headers: {
        Accept: 'application/json',
    },
});

// Sanctum (auth SPA par cookie) exige d'initialiser le cookie CSRF
// avant tout login/register/logout ou requête qui modifie des données.
let csrfReady: Promise<unknown> | null = null;
export function ensureCsrfCookie() {
    if (!csrfReady) {
        csrfReady = api.get('/sanctum/csrf-cookie');
    }
    return csrfReady;
}

// Petit helper pour normaliser les erreurs de validation Laravel (422)
// vers un objet { champ: message } comme le faisait Inertia's useForm.
export function extractValidationErrors(error: unknown): Record<string, string> {
    const err = error as { response?: { status?: number; data?: { errors?: Record<string, string[]> } } };
    if (err?.response?.status === 422 && err.response.data?.errors) {
        return Object.fromEntries(
            Object.entries(err.response.data.errors).map(([field, messages]) => [field, messages[0]]),
        );
    }
    return {};
}
