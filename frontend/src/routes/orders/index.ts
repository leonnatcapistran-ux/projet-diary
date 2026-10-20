import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Client\CommandeController::store
 * @see app/Http/Controllers/Client/CommandeController.php:54
 * @route '/commandes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/commandes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Client\CommandeController::store
 * @see app/Http/Controllers/Client/CommandeController.php:54
 * @route '/commandes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\CommandeController::store
 * @see app/Http/Controllers/Client/CommandeController.php:54
 * @route '/commandes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Client\CommandeController::store
 * @see app/Http/Controllers/Client/CommandeController.php:54
 * @route '/commandes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Client\CommandeController::store
 * @see app/Http/Controllers/Client/CommandeController.php:54
 * @route '/commandes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const orders = {
    store: Object.assign(store, store),
}

export default orders