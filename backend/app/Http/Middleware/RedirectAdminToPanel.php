<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectAdminToPanel
{
    public function handle(Request $request, Closure $next): Response
    {
        // Si l'utilisateur est connecté et c'est un admin
        if ($request->user() && method_exists($request->user(), 'isAdmin') && $request->user()->isAdmin()) {
            return redirect('/admin');
        }

        return $next($request);
    }
}
