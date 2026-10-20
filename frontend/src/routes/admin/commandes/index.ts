import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CommandeController::index
 * @see app/Http/Controllers/Admin/CommandeController.php:20
 * @route '/admin/commandes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/admin/commandes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CommandeController::index
 * @see app/Http/Controllers/Admin/CommandeController.php:20
 * @route '/admin/commandes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommandeController::index
 * @see app/Http/Controllers/Admin/CommandeController.php:20
 * @route '/admin/commandes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CommandeController::index
 * @see app/Http/Controllers/Admin/CommandeController.php:20
 * @route '/admin/commandes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CommandeController::index
 * @see app/Http/Controllers/Admin/CommandeController.php:20
 * @route '/admin/commandes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CommandeController::index
 * @see app/Http/Controllers/Admin/CommandeController.php:20
 * @route '/admin/commandes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CommandeController::index
 * @see app/Http/Controllers/Admin/CommandeController.php:20
 * @route '/admin/commandes'
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
* @see \App\Http\Controllers\Admin\CommandeController::show
 * @see app/Http/Controllers/Admin/CommandeController.php:36
 * @route '/admin/commandes/{commande}'
 */
export const show = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/admin/commandes/{commande}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CommandeController::show
 * @see app/Http/Controllers/Admin/CommandeController.php:36
 * @route '/admin/commandes/{commande}'
 */
show.url = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commande: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id_commande' in args) {
            args = { commande: args.id_commande }
        }
    
    if (Array.isArray(args)) {
        args = {
                    commande: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commande: typeof args.commande === 'object'
                ? args.commande.id_commande
                : args.commande,
                }

    return show.definition.url
            .replace('{commande}', parsedArgs.commande.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommandeController::show
 * @see app/Http/Controllers/Admin/CommandeController.php:36
 * @route '/admin/commandes/{commande}'
 */
show.get = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CommandeController::show
 * @see app/Http/Controllers/Admin/CommandeController.php:36
 * @route '/admin/commandes/{commande}'
 */
show.head = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CommandeController::show
 * @see app/Http/Controllers/Admin/CommandeController.php:36
 * @route '/admin/commandes/{commande}'
 */
    const showForm = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CommandeController::show
 * @see app/Http/Controllers/Admin/CommandeController.php:36
 * @route '/admin/commandes/{commande}'
 */
        showForm.get = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CommandeController::show
 * @see app/Http/Controllers/Admin/CommandeController.php:36
 * @route '/admin/commandes/{commande}'
 */
        showForm.head = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Admin\CommandeController::update
 * @see app/Http/Controllers/Admin/CommandeController.php:43
 * @route '/admin/commandes/{commande}'
 */
export const update = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/commandes/{commande}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\CommandeController::update
 * @see app/Http/Controllers/Admin/CommandeController.php:43
 * @route '/admin/commandes/{commande}'
 */
update.url = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commande: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id_commande' in args) {
            args = { commande: args.id_commande }
        }
    
    if (Array.isArray(args)) {
        args = {
                    commande: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commande: typeof args.commande === 'object'
                ? args.commande.id_commande
                : args.commande,
                }

    return update.definition.url
            .replace('{commande}', parsedArgs.commande.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommandeController::update
 * @see app/Http/Controllers/Admin/CommandeController.php:43
 * @route '/admin/commandes/{commande}'
 */
update.put = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\CommandeController::update
 * @see app/Http/Controllers/Admin/CommandeController.php:43
 * @route '/admin/commandes/{commande}'
 */
update.patch = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\CommandeController::update
 * @see app/Http/Controllers/Admin/CommandeController.php:43
 * @route '/admin/commandes/{commande}'
 */
    const updateForm = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CommandeController::update
 * @see app/Http/Controllers/Admin/CommandeController.php:43
 * @route '/admin/commandes/{commande}'
 */
        updateForm.put = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\CommandeController::update
 * @see app/Http/Controllers/Admin/CommandeController.php:43
 * @route '/admin/commandes/{commande}'
 */
        updateForm.patch = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\CommandeController::destroy
 * @see app/Http/Controllers/Admin/CommandeController.php:55
 * @route '/admin/commandes/{commande}'
 */
export const destroy = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/commandes/{commande}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CommandeController::destroy
 * @see app/Http/Controllers/Admin/CommandeController.php:55
 * @route '/admin/commandes/{commande}'
 */
destroy.url = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commande: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id_commande' in args) {
            args = { commande: args.id_commande }
        }
    
    if (Array.isArray(args)) {
        args = {
                    commande: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commande: typeof args.commande === 'object'
                ? args.commande.id_commande
                : args.commande,
                }

    return destroy.definition.url
            .replace('{commande}', parsedArgs.commande.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommandeController::destroy
 * @see app/Http/Controllers/Admin/CommandeController.php:55
 * @route '/admin/commandes/{commande}'
 */
destroy.delete = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\CommandeController::destroy
 * @see app/Http/Controllers/Admin/CommandeController.php:55
 * @route '/admin/commandes/{commande}'
 */
    const destroyForm = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CommandeController::destroy
 * @see app/Http/Controllers/Admin/CommandeController.php:55
 * @route '/admin/commandes/{commande}'
 */
        destroyForm.delete = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const commandes = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default commandes