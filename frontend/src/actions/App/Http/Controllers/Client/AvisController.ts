import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Client\AvisController::store
 * @see app/Http/Controllers/Client/AvisController.php:17
 * @route '/compte/avis'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/compte/avis',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Client\AvisController::store
 * @see app/Http/Controllers/Client/AvisController.php:17
 * @route '/compte/avis'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\AvisController::store
 * @see app/Http/Controllers/Client/AvisController.php:17
 * @route '/compte/avis'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Client\AvisController::store
 * @see app/Http/Controllers/Client/AvisController.php:17
 * @route '/compte/avis'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Client\AvisController::store
 * @see app/Http/Controllers/Client/AvisController.php:17
 * @route '/compte/avis'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const AvisController = { store }

export default AvisController