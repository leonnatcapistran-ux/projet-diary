import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ArticleController::index
 * @see app/Http/Controllers/Admin/ArticleController.php:37
 * @route '/admin/articles'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/articles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ArticleController::index
 * @see app/Http/Controllers/Admin/ArticleController.php:37
 * @route '/admin/articles'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ArticleController::index
 * @see app/Http/Controllers/Admin/ArticleController.php:37
 * @route '/admin/articles'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ArticleController::index
 * @see app/Http/Controllers/Admin/ArticleController.php:37
 * @route '/admin/articles'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ArticleController::index
 * @see app/Http/Controllers/Admin/ArticleController.php:37
 * @route '/admin/articles'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ArticleController::index
 * @see app/Http/Controllers/Admin/ArticleController.php:37
 * @route '/admin/articles'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ArticleController::index
 * @see app/Http/Controllers/Admin/ArticleController.php:37
 * @route '/admin/articles'
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
* @see \App\Http\Controllers\Admin\ArticleController::store
 * @see app/Http/Controllers/Admin/ArticleController.php:55
 * @route '/admin/articles'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/articles',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ArticleController::store
 * @see app/Http/Controllers/Admin/ArticleController.php:55
 * @route '/admin/articles'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ArticleController::store
 * @see app/Http/Controllers/Admin/ArticleController.php:55
 * @route '/admin/articles'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ArticleController::store
 * @see app/Http/Controllers/Admin/ArticleController.php:55
 * @route '/admin/articles'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ArticleController::store
 * @see app/Http/Controllers/Admin/ArticleController.php:55
 * @route '/admin/articles'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ArticleController::update
 * @see app/Http/Controllers/Admin/ArticleController.php:80
 * @route '/admin/articles/{article}'
 */
export const update = (args: { article: number | { id_article: number } } | [article: number | { id_article: number } ] | number | { id_article: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/articles/{article}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ArticleController::update
 * @see app/Http/Controllers/Admin/ArticleController.php:80
 * @route '/admin/articles/{article}'
 */
update.url = (args: { article: number | { id_article: number } } | [article: number | { id_article: number } ] | number | { id_article: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { article: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id_article' in args) {
            args = { article: args.id_article }
        }
    
    if (Array.isArray(args)) {
        args = {
                    article: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        article: typeof args.article === 'object'
                ? args.article.id_article
                : args.article,
                }

    return update.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ArticleController::update
 * @see app/Http/Controllers/Admin/ArticleController.php:80
 * @route '/admin/articles/{article}'
 */
update.put = (args: { article: number | { id_article: number } } | [article: number | { id_article: number } ] | number | { id_article: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\ArticleController::update
 * @see app/Http/Controllers/Admin/ArticleController.php:80
 * @route '/admin/articles/{article}'
 */
update.patch = (args: { article: number | { id_article: number } } | [article: number | { id_article: number } ] | number | { id_article: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ArticleController::update
 * @see app/Http/Controllers/Admin/ArticleController.php:80
 * @route '/admin/articles/{article}'
 */
    const updateForm = (args: { article: number | { id_article: number } } | [article: number | { id_article: number } ] | number | { id_article: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ArticleController::update
 * @see app/Http/Controllers/Admin/ArticleController.php:80
 * @route '/admin/articles/{article}'
 */
        updateForm.put = (args: { article: number | { id_article: number } } | [article: number | { id_article: number } ] | number | { id_article: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\ArticleController::update
 * @see app/Http/Controllers/Admin/ArticleController.php:80
 * @route '/admin/articles/{article}'
 */
        updateForm.patch = (args: { article: number | { id_article: number } } | [article: number | { id_article: number } ] | number | { id_article: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ArticleController::destroy
 * @see app/Http/Controllers/Admin/ArticleController.php:102
 * @route '/admin/articles/{article}'
 */
export const destroy = (args: { article: number | { id_article: number } } | [article: number | { id_article: number } ] | number | { id_article: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/articles/{article}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ArticleController::destroy
 * @see app/Http/Controllers/Admin/ArticleController.php:102
 * @route '/admin/articles/{article}'
 */
destroy.url = (args: { article: number | { id_article: number } } | [article: number | { id_article: number } ] | number | { id_article: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { article: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id_article' in args) {
            args = { article: args.id_article }
        }
    
    if (Array.isArray(args)) {
        args = {
                    article: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        article: typeof args.article === 'object'
                ? args.article.id_article
                : args.article,
                }

    return destroy.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ArticleController::destroy
 * @see app/Http/Controllers/Admin/ArticleController.php:102
 * @route '/admin/articles/{article}'
 */
destroy.delete = (args: { article: number | { id_article: number } } | [article: number | { id_article: number } ] | number | { id_article: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ArticleController::destroy
 * @see app/Http/Controllers/Admin/ArticleController.php:102
 * @route '/admin/articles/{article}'
 */
    const destroyForm = (args: { article: number | { id_article: number } } | [article: number | { id_article: number } ] | number | { id_article: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ArticleController::destroy
 * @see app/Http/Controllers/Admin/ArticleController.php:102
 * @route '/admin/articles/{article}'
 */
        destroyForm.delete = (args: { article: number | { id_article: number } } | [article: number | { id_article: number } ] | number | { id_article: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ArticleController = { index, store, update, destroy }

export default ArticleController