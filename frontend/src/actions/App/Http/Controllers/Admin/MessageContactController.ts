import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\MessageContactController::index
 * @see app/Http/Controllers/Admin/MessageContactController.php:20
 * @route '/admin/messages'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MessageContactController::index
 * @see app/Http/Controllers/Admin/MessageContactController.php:20
 * @route '/admin/messages'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MessageContactController::index
 * @see app/Http/Controllers/Admin/MessageContactController.php:20
 * @route '/admin/messages'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MessageContactController::index
 * @see app/Http/Controllers/Admin/MessageContactController.php:20
 * @route '/admin/messages'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MessageContactController::index
 * @see app/Http/Controllers/Admin/MessageContactController.php:20
 * @route '/admin/messages'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MessageContactController::index
 * @see app/Http/Controllers/Admin/MessageContactController.php:20
 * @route '/admin/messages'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MessageContactController::index
 * @see app/Http/Controllers/Admin/MessageContactController.php:20
 * @route '/admin/messages'
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
* @see \App\Http\Controllers\Admin\MessageContactController::update
 * @see app/Http/Controllers/Admin/MessageContactController.php:36
 * @route '/admin/messages/{messageContact}'
 */
export const update = (args: { messageContact: number | { id_message: number } } | [messageContact: number | { id_message: number } ] | number | { id_message: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/messages/{messageContact}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\MessageContactController::update
 * @see app/Http/Controllers/Admin/MessageContactController.php:36
 * @route '/admin/messages/{messageContact}'
 */
update.url = (args: { messageContact: number | { id_message: number } } | [messageContact: number | { id_message: number } ] | number | { id_message: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { messageContact: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id_message' in args) {
            args = { messageContact: args.id_message }
        }
    
    if (Array.isArray(args)) {
        args = {
                    messageContact: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        messageContact: typeof args.messageContact === 'object'
                ? args.messageContact.id_message
                : args.messageContact,
                }

    return update.definition.url
            .replace('{messageContact}', parsedArgs.messageContact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MessageContactController::update
 * @see app/Http/Controllers/Admin/MessageContactController.php:36
 * @route '/admin/messages/{messageContact}'
 */
update.put = (args: { messageContact: number | { id_message: number } } | [messageContact: number | { id_message: number } ] | number | { id_message: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\MessageContactController::update
 * @see app/Http/Controllers/Admin/MessageContactController.php:36
 * @route '/admin/messages/{messageContact}'
 */
    const updateForm = (args: { messageContact: number | { id_message: number } } | [messageContact: number | { id_message: number } ] | number | { id_message: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MessageContactController::update
 * @see app/Http/Controllers/Admin/MessageContactController.php:36
 * @route '/admin/messages/{messageContact}'
 */
        updateForm.put = (args: { messageContact: number | { id_message: number } } | [messageContact: number | { id_message: number } ] | number | { id_message: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\MessageContactController::destroy
 * @see app/Http/Controllers/Admin/MessageContactController.php:48
 * @route '/admin/messages/{messageContact}'
 */
export const destroy = (args: { messageContact: number | { id_message: number } } | [messageContact: number | { id_message: number } ] | number | { id_message: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/messages/{messageContact}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\MessageContactController::destroy
 * @see app/Http/Controllers/Admin/MessageContactController.php:48
 * @route '/admin/messages/{messageContact}'
 */
destroy.url = (args: { messageContact: number | { id_message: number } } | [messageContact: number | { id_message: number } ] | number | { id_message: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { messageContact: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id_message' in args) {
            args = { messageContact: args.id_message }
        }
    
    if (Array.isArray(args)) {
        args = {
                    messageContact: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        messageContact: typeof args.messageContact === 'object'
                ? args.messageContact.id_message
                : args.messageContact,
                }

    return destroy.definition.url
            .replace('{messageContact}', parsedArgs.messageContact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MessageContactController::destroy
 * @see app/Http/Controllers/Admin/MessageContactController.php:48
 * @route '/admin/messages/{messageContact}'
 */
destroy.delete = (args: { messageContact: number | { id_message: number } } | [messageContact: number | { id_message: number } ] | number | { id_message: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\MessageContactController::destroy
 * @see app/Http/Controllers/Admin/MessageContactController.php:48
 * @route '/admin/messages/{messageContact}'
 */
    const destroyForm = (args: { messageContact: number | { id_message: number } } | [messageContact: number | { id_message: number } ] | number | { id_message: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MessageContactController::destroy
 * @see app/Http/Controllers/Admin/MessageContactController.php:48
 * @route '/admin/messages/{messageContact}'
 */
        destroyForm.delete = (args: { messageContact: number | { id_message: number } } | [messageContact: number | { id_message: number } ] | number | { id_message: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const MessageContactController = { index, update, destroy }

export default MessageContactController