<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckInactiveUser
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->statut === 'inactif') {
            auth()->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            
            return redirect('/login')->with('status', 'Votre compte a été désactivé. Veuillez contacter le support.');
        }

        return $next($request);
    }
}
