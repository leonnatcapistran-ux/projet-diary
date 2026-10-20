import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Client\CommandeController::index
 * @see app/Http/Controllers/Client/CommandeController.php:26
 * @route '/compte/commandes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/compte/commandes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Client\CommandeController::index
 * @see app/Http/Controllers/Client/CommandeController.php:26
 * @route '/compte/commandes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\CommandeController::index
 * @see app/Http/Controllers/Client/CommandeController.php:26
 * @route '/compte/commandes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Client\CommandeController::index
 * @see app/Http/Controllers/Client/CommandeController.php:26
 * @route '/compte/commandes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Client\CommandeController::index
 * @see app/Http/Controllers/Client/CommandeController.php:26
 * @route '/compte/commandes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Client\CommandeController::index
 * @see app/Http/Controllers/Client/CommandeController.php:26
 * @route '/compte/commandes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Client\CommandeController::index
 * @see app/Http/Controllers/Client/CommandeController.php:26
 * @route '/compte/commandes'
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
* @see \App\Http\Controllers\Client\CommandeController::downloadFacture
 * @see app/Http/Controllers/Client/CommandeController.php:81
 * @route '/compte/commandes/{commande}/facture'
 */
export const downloadFacture = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadFacture.url(args, options),
    method: 'get',
})

downloadFacture.definition = {
    methods: ["get","head"],
    url: '/compte/commandes/{commande}/facture',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Client\CommandeController::downloadFacture
 * @see app/Http/Controllers/Client/CommandeController.php:81
 * @route '/compte/commandes/{commande}/facture'
 */
downloadFacture.url = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions) => {
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

    return downloadFacture.definition.url
            .replace('{commande}', parsedArgs.commande.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\CommandeController::downloadFacture
 * @see app/Http/Controllers/Client/CommandeController.php:81
 * @route '/compte/commandes/{commande}/facture'
 */
downloadFacture.get = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadFacture.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Client\CommandeController::downloadFacture
 * @see app/Http/Controllers/Client/CommandeController.php:81
 * @route '/compte/commandes/{commande}/facture'
 */
downloadFacture.head = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadFacture.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Client\CommandeController::downloadFacture
 * @see app/Http/Controllers/Client/CommandeController.php:81
 * @route '/compte/commandes/{commande}/facture'
 */
    const downloadFactureForm = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadFacture.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Client\CommandeController::downloadFacture
 * @see app/Http/Controllers/Client/CommandeController.php:81
 * @route '/compte/commandes/{commande}/facture'
 */
        downloadFactureForm.get = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadFacture.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Client\CommandeController::downloadFacture
 * @see app/Http/Controllers/Client/CommandeController.php:81
 * @route '/compte/commandes/{commande}/facture'
 */
        downloadFactureForm.head = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadFacture.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadFacture.form = downloadFactureForm
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
    url: '/commandes',
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
const CommandeController = { index, downloadFacture, store }

export default CommandeController