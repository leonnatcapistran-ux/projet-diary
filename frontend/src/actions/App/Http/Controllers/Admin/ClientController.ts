import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ClientController::index
 * @see app/Http/Controllers/Admin/ClientController.php:19
 * @route '/admin/clients'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/clients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ClientController::index
 * @see app/Http/Controllers/Admin/ClientController.php:19
 * @route '/admin/clients'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClientController::index
 * @see app/Http/Controllers/Admin/ClientController.php:19
 * @route '/admin/clients'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ClientController::index
 * @see app/Http/Controllers/Admin/ClientController.php:19
 * @route '/admin/clients'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ClientController::index
 * @see app/Http/Controllers/Admin/ClientController.php:19
 * @route '/admin/clients'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ClientController::index
 * @see app/Http/Controllers/Admin/ClientController.php:19
 * @route '/admin/clients'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ClientController::index
 * @see app/Http/Controllers/Admin/ClientController.php:19
 * @route '/admin/clients'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\ClientController::deactivate
 * @see app/Http/Controllers/Admin/ClientController.php:41
 * @route '/admin/clients/{user}/deactivate'
 */
export const deactivate = (args: { user: number | { id_user: number } } | [user: number | { id_user: number } ] | number | { id_user: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: deactivate.url(args, options),
    method: 'patch',
})

deactivate.definition = {
    methods: ["patch"],
    url: '/admin/clients/{user}/deactivate',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\ClientController::deactivate
 * @see app/Http/Controllers/Admin/ClientController.php:41
 * @route '/admin/clients/{user}/deactivate'
 */
deactivate.url = (args: { user: number | { id_user: number } } | [user: number | { id_user: number } ] | number | { id_user: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id_user' in args) {
            args = { user: args.id_user }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id_user
                : args.user,
                }

    return deactivate.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClientController::deactivate
 * @see app/Http/Controllers/Admin/ClientController.php:41
 * @route '/admin/clients/{user}/deactivate'
 */
deactivate.patch = (args: { user: number | { id_user: number } } | [user: number | { id_user: number } ] | number | { id_user: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: deactivate.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ClientController::deactivate
 * @see app/Http/Controllers/Admin/ClientController.php:41
 * @route '/admin/clients/{user}/deactivate'
 */
    const deactivateForm = (args: { user: number | { id_user: number } } | [user: number | { id_user: number } ] | number | { id_user: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deactivate.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ClientController::deactivate
 * @see app/Http/Controllers/Admin/ClientController.php:41
 * @route '/admin/clients/{user}/deactivate'
 */
        deactivateForm.patch = (args: { user: number | { id_user: number } } | [user: number | { id_user: number } ] | number | { id_user: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deactivate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deactivate.form = deactivateForm
/**
* @see \App\Http\Controllers\Admin\ClientController::activate
 * @see app/Http/Controllers/Admin/ClientController.php:47
 * @route '/admin/clients/{user}/activate'
 */
export const activate = (args: { user: number | { id_user: number } } | [user: number | { id_user: number } ] | number | { id_user: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: activate.url(args, options),
    method: 'patch',
})

activate.definition = {
    methods: ["patch"],
    url: '/admin/clients/{user}/activate',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\ClientController::activate
 * @see app/Http/Controllers/Admin/ClientController.php:47
 * @route '/admin/clients/{user}/activate'
 */
activate.url = (args: { user: number | { id_user: number } } | [user: number | { id_user: number } ] | number | { id_user: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id_user' in args) {
            args = { user: args.id_user }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id_user
                : args.user,
                }

    return activate.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClientController::activate
 * @see app/Http/Controllers/Admin/ClientController.php:47
 * @route '/admin/clients/{user}/activate'
 */
activate.patch = (args: { user: number | { id_user: number } } | [user: number | { id_user: number } ] | number | { id_user: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: activate.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ClientController::activate
 * @see app/Http/Controllers/Admin/ClientController.php:47
 * @route '/admin/clients/{user}/activate'
 */
    const activateForm = (args: { user: number | { id_user: number } } | [user: number | { id_user: number } ] | number | { id_user: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: activate.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ClientController::activate
 * @see app/Http/Controllers/Admin/ClientController.php:47
 * @route '/admin/clients/{user}/activate'
 */
        activateForm.patch = (args: { user: number | { id_user: number } } | [user: number | { id_user: number } ] | number | { id_user: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: activate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    activate.form = activateForm
/**
* @see \App\Http\Controllers\Admin\ClientController::destroy
 * @see app/Http/Controllers/Admin/ClientController.php:35
 * @route '/admin/clients/{user}'
 */
export const destroy = (args: { user: number | { id_user: number } } | [user: number | { id_user: number } ] | number | { id_user: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/clients/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ClientController::destroy
 * @see app/Http/Controllers/Admin/ClientController.php:35
 * @route '/admin/clients/{user}'
 */
destroy.url = (args: { user: number | { id_user: number } } | [user: number | { id_user: number } ] | number | { id_user: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id_user' in args) {
            args = { user: args.id_user }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id_user
                : args.user,
                }

    return destroy.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClientController::destroy
 * @see app/Http/Controllers/Admin/ClientController.php:35
 * @route '/admin/clients/{user}'
 */
destroy.delete = (args: { user: number | { id_user: number } } | [user: number | { id_user: number } ] | number | { id_user: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ClientController::destroy
 * @see app/Http/Controllers/Admin/ClientController.php:35
 * @route '/admin/clients/{user}'
 */
    const destroyForm = (args: { user: number | { id_user: number } } | [user: number | { id_user: number } ] | number | { id_user: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ClientController::destroy
 * @see app/Http/Controllers/Admin/ClientController.php:35
 * @route '/admin/clients/{user}'
 */
        destroyForm.delete = (args: { user: number | { id_user: number } } | [user: number | { id_user: number } ] | number | { id_user: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ClientController = { index, deactivate, activate, destroy }

export default ClientController