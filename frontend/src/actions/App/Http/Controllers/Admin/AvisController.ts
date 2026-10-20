import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AvisController::index
 * @see app/Http/Controllers/Admin/AvisController.php:20
 * @route '/admin/avis'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/avis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AvisController::index
 * @see app/Http/Controllers/Admin/AvisController.php:20
 * @route '/admin/avis'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AvisController::index
 * @see app/Http/Controllers/Admin/AvisController.php:20
 * @route '/admin/avis'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AvisController::index
 * @see app/Http/Controllers/Admin/AvisController.php:20
 * @route '/admin/avis'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AvisController::index
 * @see app/Http/Controllers/Admin/AvisController.php:20
 * @route '/admin/avis'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AvisController::index
 * @see app/Http/Controllers/Admin/AvisController.php:20
 * @route '/admin/avis'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AvisController::index
 * @see app/Http/Controllers/Admin/AvisController.php:20
 * @route '/admin/avis'
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
* @see \App\Http\Controllers\Admin\AvisController::update
 * @see app/Http/Controllers/Admin/AvisController.php:36
 * @route '/admin/avis/{avis}'
 */
export const update = (args: { avis: number | { id_avis: number } } | [avis: number | { id_avis: number } ] | number | { id_avis: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/avis/{avis}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AvisController::update
 * @see app/Http/Controllers/Admin/AvisController.php:36
 * @route '/admin/avis/{avis}'
 */
update.url = (args: { avis: number | { id_avis: number } } | [avis: number | { id_avis: number } ] | number | { id_avis: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { avis: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id_avis' in args) {
            args = { avis: args.id_avis }
        }
    
    if (Array.isArray(args)) {
        args = {
                    avis: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        avis: typeof args.avis === 'object'
                ? args.avis.id_avis
                : args.avis,
                }

    return update.definition.url
            .replace('{avis}', parsedArgs.avis.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AvisController::update
 * @see app/Http/Controllers/Admin/AvisController.php:36
 * @route '/admin/avis/{avis}'
 */
update.put = (args: { avis: number | { id_avis: number } } | [avis: number | { id_avis: number } ] | number | { id_avis: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AvisController::update
 * @see app/Http/Controllers/Admin/AvisController.php:36
 * @route '/admin/avis/{avis}'
 */
    const updateForm = (args: { avis: number | { id_avis: number } } | [avis: number | { id_avis: number } ] | number | { id_avis: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AvisController::update
 * @see app/Http/Controllers/Admin/AvisController.php:36
 * @route '/admin/avis/{avis}'
 */
        updateForm.put = (args: { avis: number | { id_avis: number } } | [avis: number | { id_avis: number } ] | number | { id_avis: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const AvisController = { index, update }

export default AvisController