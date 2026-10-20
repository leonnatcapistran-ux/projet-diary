<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'register', 'user/*'],

    'allowed_methods' => ['*'],

    // En dev : le frontend Vite tourne sur http://localhost:5173
    // En prod : remplace par l'URL réelle de ton frontend (ex: https://app.tondomaine.mg)
    'allowed_origins' => explode(',', env('FRONTEND_URLS', 'http://localhost:5173')),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // Obligatoire pour Sanctum SPA (cookies de session envoyés cross-origin)
    'supports_credentials' => true,
];
