import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
    url: '/api/compte/commandes',
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
* @see \App\Http\Controllers\Client\CommandeController::facture
 * @see app/Http/Controllers/Client/CommandeController.php:81
 * @route '/compte/commandes/{commande}/facture'
 */
export const facture = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: facture.url(args, options),
    method: 'get',
})

facture.definition = {
    methods: ["get","head"],
    url: '/api/compte/commandes/{commande}/facture',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Client\CommandeController::facture
 * @see app/Http/Controllers/Client/CommandeController.php:81
 * @route '/compte/commandes/{commande}/facture'
 */
facture.url = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions) => {
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

    return facture.definition.url
            .replace('{commande}', parsedArgs.commande.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\CommandeController::facture
 * @see app/Http/Controllers/Client/CommandeController.php:81
 * @route '/compte/commandes/{commande}/facture'
 */
facture.get = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: facture.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Client\CommandeController::facture
 * @see app/Http/Controllers/Client/CommandeController.php:81
 * @route '/compte/commandes/{commande}/facture'
 */
facture.head = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: facture.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Client\CommandeController::facture
 * @see app/Http/Controllers/Client/CommandeController.php:81
 * @route '/compte/commandes/{commande}/facture'
 */
    const factureForm = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: facture.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Client\CommandeController::facture
 * @see app/Http/Controllers/Client/CommandeController.php:81
 * @route '/compte/commandes/{commande}/facture'
 */
        factureForm.get = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: facture.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Client\CommandeController::facture
 * @see app/Http/Controllers/Client/CommandeController.php:81
 * @route '/compte/commandes/{commande}/facture'
 */
        factureForm.head = (args: { commande: number | { id_commande: number } } | [commande: number | { id_commande: number } ] | number | { id_commande: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: facture.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    facture.form = factureForm
const orders = {
    index: Object.assign(index, index),
facture: Object.assign(facture, facture),
}

export default orders