import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CategorieArticleController::index
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:19
 * @route '/admin/categories'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CategorieArticleController::index
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:19
 * @route '/admin/categories'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CategorieArticleController::index
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:19
 * @route '/admin/categories'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CategorieArticleController::index
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:19
 * @route '/admin/categories'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CategorieArticleController::index
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:19
 * @route '/admin/categories'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CategorieArticleController::index
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:19
 * @route '/admin/categories'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CategorieArticleController::index
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:19
 * @route '/admin/categories'
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
* @see \App\Http\Controllers\Admin\CategorieArticleController::store
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:28
 * @route '/admin/categories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CategorieArticleController::store
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:28
 * @route '/admin/categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CategorieArticleController::store
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:28
 * @route '/admin/categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\CategorieArticleController::store
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:28
 * @route '/admin/categories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CategorieArticleController::store
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:28
 * @route '/admin/categories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\CategorieArticleController::update
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:36
 * @route '/admin/categories/{categorie_article}'
 */
export const update = (args: { categorie_article: number | { id_categorie_article: number } } | [categorie_article: number | { id_categorie_article: number } ] | number | { id_categorie_article: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/categories/{categorie_article}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\CategorieArticleController::update
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:36
 * @route '/admin/categories/{categorie_article}'
 */
update.url = (args: { categorie_article: number | { id_categorie_article: number } } | [categorie_article: number | { id_categorie_article: number } ] | number | { id_categorie_article: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { categorie_article: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id_categorie_article' in args) {
            args = { categorie_article: args.id_categorie_article }
        }
    
    if (Array.isArray(args)) {
        args = {
                    categorie_article: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        categorie_article: typeof args.categorie_article === 'object'
                ? args.categorie_article.id_categorie_article
                : args.categorie_article,
                }

    return update.definition.url
            .replace('{categorie_article}', parsedArgs.categorie_article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CategorieArticleController::update
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:36
 * @route '/admin/categories/{categorie_article}'
 */
update.put = (args: { categorie_article: number | { id_categorie_article: number } } | [categorie_article: number | { id_categorie_article: number } ] | number | { id_categorie_article: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\CategorieArticleController::update
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:36
 * @route '/admin/categories/{categorie_article}'
 */
update.patch = (args: { categorie_article: number | { id_categorie_article: number } } | [categorie_article: number | { id_categorie_article: number } ] | number | { id_categorie_article: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\CategorieArticleController::update
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:36
 * @route '/admin/categories/{categorie_article}'
 */
    const updateForm = (args: { categorie_article: number | { id_categorie_article: number } } | [categorie_article: number | { id_categorie_article: number } ] | number | { id_categorie_article: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CategorieArticleController::update
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:36
 * @route '/admin/categories/{categorie_article}'
 */
        updateForm.put = (args: { categorie_article: number | { id_categorie_article: number } } | [categorie_article: number | { id_categorie_article: number } ] | number | { id_categorie_article: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\CategorieArticleController::update
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:36
 * @route '/admin/categories/{categorie_article}'
 */
        updateForm.patch = (args: { categorie_article: number | { id_categorie_article: number } } | [categorie_article: number | { id_categorie_article: number } ] | number | { id_categorie_article: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\CategorieArticleController::destroy
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:44
 * @route '/admin/categories/{categorie_article}'
 */
export const destroy = (args: { categorie_article: number | { id_categorie_article: number } } | [categorie_article: number | { id_categorie_article: number } ] | number | { id_categorie_article: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/categories/{categorie_article}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CategorieArticleController::destroy
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:44
 * @route '/admin/categories/{categorie_article}'
 */
destroy.url = (args: { categorie_article: number | { id_categorie_article: number } } | [categorie_article: number | { id_categorie_article: number } ] | number | { id_categorie_article: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { categorie_article: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id_categorie_article' in args) {
            args = { categorie_article: args.id_categorie_article }
        }
    
    if (Array.isArray(args)) {
        args = {
                    categorie_article: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        categorie_article: typeof args.categorie_article === 'object'
                ? args.categorie_article.id_categorie_article
                : args.categorie_article,
                }

    return destroy.definition.url
            .replace('{categorie_article}', parsedArgs.categorie_article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CategorieArticleController::destroy
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:44
 * @route '/admin/categories/{categorie_article}'
 */
destroy.delete = (args: { categorie_article: number | { id_categorie_article: number } } | [categorie_article: number | { id_categorie_article: number } ] | number | { id_categorie_article: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\CategorieArticleController::destroy
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:44
 * @route '/admin/categories/{categorie_article}'
 */
    const destroyForm = (args: { categorie_article: number | { id_categorie_article: number } } | [categorie_article: number | { id_categorie_article: number } ] | number | { id_categorie_article: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CategorieArticleController::destroy
 * @see app/Http/Controllers/Admin/CategorieArticleController.php:44
 * @route '/admin/categories/{categorie_article}'
 */
        destroyForm.delete = (args: { categorie_article: number | { id_categorie_article: number } } | [categorie_article: number | { id_categorie_article: number } ] | number | { id_categorie_article: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const CategorieArticleController = { index, store, update, destroy }

export default CategorieArticleController