import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Public\CatalogueController::index
 * @see app/Http/Controllers/Public/CatalogueController.php:12
 * @route '/catalogue'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/catalogue',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\CatalogueController::index
 * @see app/Http/Controllers/Public/CatalogueController.php:12
 * @route '/catalogue'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\CatalogueController::index
 * @see app/Http/Controllers/Public/CatalogueController.php:12
 * @route '/catalogue'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Public\CatalogueController::index
 * @see app/Http/Controllers/Public/CatalogueController.php:12
 * @route '/catalogue'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Public\CatalogueController::index
 * @see app/Http/Controllers/Public/CatalogueController.php:12
 * @route '/catalogue'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Public\CatalogueController::index
 * @see app/Http/Controllers/Public/CatalogueController.php:12
 * @route '/catalogue'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Public\CatalogueController::index
 * @see app/Http/Controllers/Public/CatalogueController.php:12
 * @route '/catalogue'
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
const catalogue = {
    index: Object.assign(index, index),
}

export default catalogue