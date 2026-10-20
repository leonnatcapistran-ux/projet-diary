<?php

namespace App\Auth;

use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;

class CustomUserProvider extends EloquentUserProvider
{
    /**
     * Validate a user against the given credentials.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @param  array  $credentials
     * @return bool
     */
    public function validateCredentials(Authenticatable $user, array $credentials)
    {
        if (!isset($credentials['password'])) {
            return false;
        }

        return $this->hasher->check($credentials['password'], $user->getAuthPassword());
    }
}
