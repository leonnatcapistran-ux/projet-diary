import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ProduitController::index
 * @see app/Http/Controllers/Admin/ProduitController.php:23
 * @route '/admin/produits'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/admin/produits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProduitController::index
 * @see app/Http/Controllers/Admin/ProduitController.php:23
 * @route '/admin/produits'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProduitController::index
 * @see app/Http/Controllers/Admin/ProduitController.php:23
 * @route '/admin/produits'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ProduitController::index
 * @see app/Http/Controllers/Admin/ProduitController.php:23
 * @route '/admin/produits'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ProduitController::index
 * @see app/Http/Controllers/Admin/ProduitController.php:23
 * @route '/admin/produits'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ProduitController::index
 * @see app/Http/Controllers/Admin/ProduitController.php:23
 * @route '/admin/produits'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ProduitController::index
 * @see app/Http/Controllers/Admin/ProduitController.php:23
 * @route '/admin/produits'
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
* @see \App\Http\Controllers\Admin\ProduitController::store
 * @see app/Http/Controllers/Admin/ProduitController.php:39
 * @route '/admin/produits'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/produits',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ProduitController::store
 * @see app/Http/Controllers/Admin/ProduitController.php:39
 * @route '/admin/produits'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProduitController::store
 * @see app/Http/Controllers/Admin/ProduitController.php:39
 * @route '/admin/produits'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ProduitController::store
 * @see app/Http/Controllers/Admin/ProduitController.php:39
 * @route '/admin/produits'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ProduitController::store
 * @see app/Http/Controllers/Admin/ProduitController.php:39
 * @route '/admin/produits'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ProduitController::update
 * @see app/Http/Controllers/Admin/ProduitController.php:58
 * @route '/admin/produits/{produit}'
 */
export const update = (args: { produit: number | { id_produit: number } } | [produit: number | { id_produit: number } ] | number | { id_produit: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/produits/{produit}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ProduitController::update
 * @see app/Http/Controllers/Admin/ProduitController.php:58
 * @route '/admin/produits/{produit}'
 */
update.url = (args: { produit: number | { id_produit: number } } | [produit: number | { id_produit: number } ] | number | { id_produit: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { produit: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id_produit' in args) {
            args = { produit: args.id_produit }
        }
    
    if (Array.isArray(args)) {
        args = {
                    produit: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        produit: typeof args.produit === 'object'
                ? args.produit.id_produit
                : args.produit,
                }

    return update.definition.url
            .replace('{produit}', parsedArgs.produit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProduitController::update
 * @see app/Http/Controllers/Admin/ProduitController.php:58
 * @route '/admin/produits/{produit}'
 */
update.put = (args: { produit: number | { id_produit: number } } | [produit: number | { id_produit: number } ] | number | { id_produit: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\ProduitController::update
 * @see app/Http/Controllers/Admin/ProduitController.php:58
 * @route '/admin/produits/{produit}'
 */
update.patch = (args: { produit: number | { id_produit: number } } | [produit: number | { id_produit: number } ] | number | { id_produit: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ProduitController::update
 * @see app/Http/Controllers/Admin/ProduitController.php:58
 * @route '/admin/produits/{produit}'
 */
    const updateForm = (args: { produit: number | { id_produit: number } } | [produit: number | { id_produit: number } ] | number | { id_produit: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ProduitController::update
 * @see app/Http/Controllers/Admin/ProduitController.php:58
 * @route '/admin/produits/{produit}'
 */
        updateForm.put = (args: { produit: number | { id_produit: number } } | [produit: number | { id_produit: number } ] | number | { id_produit: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\ProduitController::update
 * @see app/Http/Controllers/Admin/ProduitController.php:58
 * @route '/admin/produits/{produit}'
 */
        updateForm.patch = (args: { produit: number | { id_produit: number } } | [produit: number | { id_produit: number } ] | number | { id_produit: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ProduitController::destroy
 * @see app/Http/Controllers/Admin/ProduitController.php:82
 * @route '/admin/produits/{produit}'
 */
export const destroy = (args: { produit: number | { id_produit: number } } | [produit: number | { id_produit: number } ] | number | { id_produit: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/produits/{produit}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ProduitController::destroy
 * @see app/Http/Controllers/Admin/ProduitController.php:82
 * @route '/admin/produits/{produit}'
 */
destroy.url = (args: { produit: number | { id_produit: number } } | [produit: number | { id_produit: number } ] | number | { id_produit: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { produit: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id_produit' in args) {
            args = { produit: args.id_produit }
        }
    
    if (Array.isArray(args)) {
        args = {
                    produit: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        produit: typeof args.produit === 'object'
                ? args.produit.id_produit
                : args.produit,
                }

    return destroy.definition.url
            .replace('{produit}', parsedArgs.produit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProduitController::destroy
 * @see app/Http/Controllers/Admin/ProduitController.php:82
 * @route '/admin/produits/{produit}'
 */
destroy.delete = (args: { produit: number | { id_produit: number } } | [produit: number | { id_produit: number } ] | number | { id_produit: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ProduitController::destroy
 * @see app/Http/Controllers/Admin/ProduitController.php:82
 * @route '/admin/produits/{produit}'
 */
    const destroyForm = (args: { produit: number | { id_produit: number } } | [produit: number | { id_produit: number } ] | number | { id_produit: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ProduitController::destroy
 * @see app/Http/Controllers/Admin/ProduitController.php:82
 * @route '/admin/produits/{produit}'
 */
        destroyForm.delete = (args: { produit: number | { id_produit: number } } | [produit: number | { id_produit: number } ] | number | { id_produit: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const produits = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default produits