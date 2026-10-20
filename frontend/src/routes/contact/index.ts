import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
 * @see routes/web.php:68
 * @route '/nous-contacter'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/nous-contacter',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:68
 * @route '/nous-contacter'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:68
 * @route '/nous-contacter'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:68
 * @route '/nous-contacter'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:68
 * @route '/nous-contacter'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:68
 * @route '/nous-contacter'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:68
 * @route '/nous-contacter'
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
* @see \App\Http\Controllers\Client\MessageContactController::store
 * @see app/Http/Controllers/Client/MessageContactController.php:19
 * @route '/contact'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/contact',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Client\MessageContactController::store
 * @see app/Http/Controllers/Client/MessageContactController.php:19
 * @route '/contact'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\MessageContactController::store
 * @see app/Http/Controllers/Client/MessageContactController.php:19
 * @route '/contact'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Client\MessageContactController::store
 * @see app/Http/Controllers/Client/MessageContactController.php:19
 * @route '/contact'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Client\MessageContactController::store
 * @see app/Http/Controllers/Client/MessageContactController.php:19
 * @route '/contact'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const contact = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
}

export default contact