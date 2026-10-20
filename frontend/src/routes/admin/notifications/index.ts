import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\NotificationController::index
 * @see app/Http/Controllers/Admin/NotificationController.php:15
 * @route '/admin/notifications'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/admin/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NotificationController::index
 * @see app/Http/Controllers/Admin/NotificationController.php:15
 * @route '/admin/notifications'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NotificationController::index
 * @see app/Http/Controllers/Admin/NotificationController.php:15
 * @route '/admin/notifications'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\NotificationController::index
 * @see app/Http/Controllers/Admin/NotificationController.php:15
 * @route '/admin/notifications'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\NotificationController::index
 * @see app/Http/Controllers/Admin/NotificationController.php:15
 * @route '/admin/notifications'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\NotificationController::index
 * @see app/Http/Controllers/Admin/NotificationController.php:15
 * @route '/admin/notifications'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\NotificationController::index
 * @see app/Http/Controllers/Admin/NotificationController.php:15
 * @route '/admin/notifications'
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
* @see \App\Http\Controllers\Admin\NotificationController::markViewed
 * @see app/Http/Controllers/Admin/NotificationController.php:81
 * @route '/admin/notifications/{type}/{id}/mark-viewed'
 */
export const markViewed = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markViewed.url(args, options),
    method: 'post',
})

markViewed.definition = {
    methods: ["post"],
    url: '/api/admin/notifications/{type}/{id}/mark-viewed',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\NotificationController::markViewed
 * @see app/Http/Controllers/Admin/NotificationController.php:81
 * @route '/admin/notifications/{type}/{id}/mark-viewed'
 */
markViewed.url = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    type: args[0],
                    id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        type: args.type,
                                id: args.id,
                }

    return markViewed.definition.url
            .replace('{type}', parsedArgs.type.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NotificationController::markViewed
 * @see app/Http/Controllers/Admin/NotificationController.php:81
 * @route '/admin/notifications/{type}/{id}/mark-viewed'
 */
markViewed.post = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markViewed.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\NotificationController::markViewed
 * @see app/Http/Controllers/Admin/NotificationController.php:81
 * @route '/admin/notifications/{type}/{id}/mark-viewed'
 */
    const markViewedForm = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markViewed.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\NotificationController::markViewed
 * @see app/Http/Controllers/Admin/NotificationController.php:81
 * @route '/admin/notifications/{type}/{id}/mark-viewed'
 */
        markViewedForm.post = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markViewed.url(args, options),
            method: 'post',
        })
    
    markViewed.form = markViewedForm
const notifications = {
    index: Object.assign(index, index),
markViewed: Object.assign(markViewed, markViewed),
}

export default notifications