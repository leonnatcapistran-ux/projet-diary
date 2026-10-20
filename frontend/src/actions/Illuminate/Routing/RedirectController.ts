import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
const RedirectControllerc167f352a9a6b4645941500dc0ed12ed = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, options),
    method: 'get',
})

RedirectControllerc167f352a9a6b4645941500dc0ed12ed.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/catalogue/{origin}',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { origin: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    origin: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        origin: args.origin,
                }

    return RedirectControllerc167f352a9a6b4645941500dc0ed12ed.definition.url
            .replace('{origin}', parsedArgs.origin.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
RedirectControllerc167f352a9a6b4645941500dc0ed12ed.get = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
RedirectControllerc167f352a9a6b4645941500dc0ed12ed.head = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
RedirectControllerc167f352a9a6b4645941500dc0ed12ed.post = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
RedirectControllerc167f352a9a6b4645941500dc0ed12ed.put = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
RedirectControllerc167f352a9a6b4645941500dc0ed12ed.patch = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
RedirectControllerc167f352a9a6b4645941500dc0ed12ed.delete = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
RedirectControllerc167f352a9a6b4645941500dc0ed12ed.options = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
    const RedirectControllerc167f352a9a6b4645941500dc0ed12edForm = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
        RedirectControllerc167f352a9a6b4645941500dc0ed12edForm.get = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
        RedirectControllerc167f352a9a6b4645941500dc0ed12edForm.head = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
        RedirectControllerc167f352a9a6b4645941500dc0ed12edForm.post = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
        RedirectControllerc167f352a9a6b4645941500dc0ed12edForm.put = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
        RedirectControllerc167f352a9a6b4645941500dc0ed12edForm.patch = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
        RedirectControllerc167f352a9a6b4645941500dc0ed12edForm.delete = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/catalogue/{origin}'
 */
        RedirectControllerc167f352a9a6b4645941500dc0ed12edForm.options = (args: { origin: string | number } | [origin: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllerc167f352a9a6b4645941500dc0ed12ed.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectControllerc167f352a9a6b4645941500dc0ed12ed.form = RedirectControllerc167f352a9a6b4645941500dc0ed12edForm
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
const RedirectController535fd093ca1d5254af5dc12ac208e8d5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url(options),
    method: 'get',
})

RedirectController535fd093ca1d5254af5dc12ac208e8d5.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/about',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
RedirectController535fd093ca1d5254af5dc12ac208e8d5.url = (options?: RouteQueryOptions) => {
    return RedirectController535fd093ca1d5254af5dc12ac208e8d5.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
RedirectController535fd093ca1d5254af5dc12ac208e8d5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
RedirectController535fd093ca1d5254af5dc12ac208e8d5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
RedirectController535fd093ca1d5254af5dc12ac208e8d5.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
RedirectController535fd093ca1d5254af5dc12ac208e8d5.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
RedirectController535fd093ca1d5254af5dc12ac208e8d5.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
RedirectController535fd093ca1d5254af5dc12ac208e8d5.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
RedirectController535fd093ca1d5254af5dc12ac208e8d5.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
    const RedirectController535fd093ca1d5254af5dc12ac208e8d5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
        RedirectController535fd093ca1d5254af5dc12ac208e8d5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
        RedirectController535fd093ca1d5254af5dc12ac208e8d5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
        RedirectController535fd093ca1d5254af5dc12ac208e8d5Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
        RedirectController535fd093ca1d5254af5dc12ac208e8d5Form.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
        RedirectController535fd093ca1d5254af5dc12ac208e8d5Form.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
        RedirectController535fd093ca1d5254af5dc12ac208e8d5Form.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/about'
 */
        RedirectController535fd093ca1d5254af5dc12ac208e8d5Form.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController535fd093ca1d5254af5dc12ac208e8d5.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController535fd093ca1d5254af5dc12ac208e8d5.form = RedirectController535fd093ca1d5254af5dc12ac208e8d5Form
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
const RedirectController68c08bfac23f697f957867ffa87cd5ac = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController68c08bfac23f697f957867ffa87cd5ac.url(options),
    method: 'get',
})

RedirectController68c08bfac23f697f957867ffa87cd5ac.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/engagement',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
RedirectController68c08bfac23f697f957867ffa87cd5ac.url = (options?: RouteQueryOptions) => {
    return RedirectController68c08bfac23f697f957867ffa87cd5ac.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
RedirectController68c08bfac23f697f957867ffa87cd5ac.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController68c08bfac23f697f957867ffa87cd5ac.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
RedirectController68c08bfac23f697f957867ffa87cd5ac.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController68c08bfac23f697f957867ffa87cd5ac.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
RedirectController68c08bfac23f697f957867ffa87cd5ac.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController68c08bfac23f697f957867ffa87cd5ac.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
RedirectController68c08bfac23f697f957867ffa87cd5ac.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController68c08bfac23f697f957867ffa87cd5ac.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
RedirectController68c08bfac23f697f957867ffa87cd5ac.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController68c08bfac23f697f957867ffa87cd5ac.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
RedirectController68c08bfac23f697f957867ffa87cd5ac.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController68c08bfac23f697f957867ffa87cd5ac.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
RedirectController68c08bfac23f697f957867ffa87cd5ac.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController68c08bfac23f697f957867ffa87cd5ac.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
    const RedirectController68c08bfac23f697f957867ffa87cd5acForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController68c08bfac23f697f957867ffa87cd5ac.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
        RedirectController68c08bfac23f697f957867ffa87cd5acForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController68c08bfac23f697f957867ffa87cd5ac.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
        RedirectController68c08bfac23f697f957867ffa87cd5acForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController68c08bfac23f697f957867ffa87cd5ac.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
        RedirectController68c08bfac23f697f957867ffa87cd5acForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController68c08bfac23f697f957867ffa87cd5ac.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
        RedirectController68c08bfac23f697f957867ffa87cd5acForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController68c08bfac23f697f957867ffa87cd5ac.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
        RedirectController68c08bfac23f697f957867ffa87cd5acForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController68c08bfac23f697f957867ffa87cd5ac.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
        RedirectController68c08bfac23f697f957867ffa87cd5acForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController68c08bfac23f697f957867ffa87cd5ac.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagement'
 */
        RedirectController68c08bfac23f697f957867ffa87cd5acForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController68c08bfac23f697f957867ffa87cd5ac.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController68c08bfac23f697f957867ffa87cd5ac.form = RedirectController68c08bfac23f697f957867ffa87cd5acForm
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
const RedirectController6874ae14735176a56abaea45f91715cb = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController6874ae14735176a56abaea45f91715cb.url(options),
    method: 'get',
})

RedirectController6874ae14735176a56abaea45f91715cb.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/notre-histoire',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
RedirectController6874ae14735176a56abaea45f91715cb.url = (options?: RouteQueryOptions) => {
    return RedirectController6874ae14735176a56abaea45f91715cb.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
RedirectController6874ae14735176a56abaea45f91715cb.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController6874ae14735176a56abaea45f91715cb.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
RedirectController6874ae14735176a56abaea45f91715cb.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController6874ae14735176a56abaea45f91715cb.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
RedirectController6874ae14735176a56abaea45f91715cb.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController6874ae14735176a56abaea45f91715cb.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
RedirectController6874ae14735176a56abaea45f91715cb.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController6874ae14735176a56abaea45f91715cb.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
RedirectController6874ae14735176a56abaea45f91715cb.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController6874ae14735176a56abaea45f91715cb.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
RedirectController6874ae14735176a56abaea45f91715cb.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController6874ae14735176a56abaea45f91715cb.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
RedirectController6874ae14735176a56abaea45f91715cb.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController6874ae14735176a56abaea45f91715cb.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
    const RedirectController6874ae14735176a56abaea45f91715cbForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController6874ae14735176a56abaea45f91715cb.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
        RedirectController6874ae14735176a56abaea45f91715cbForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController6874ae14735176a56abaea45f91715cb.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
        RedirectController6874ae14735176a56abaea45f91715cbForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController6874ae14735176a56abaea45f91715cb.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
        RedirectController6874ae14735176a56abaea45f91715cbForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6874ae14735176a56abaea45f91715cb.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
        RedirectController6874ae14735176a56abaea45f91715cbForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6874ae14735176a56abaea45f91715cb.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
        RedirectController6874ae14735176a56abaea45f91715cbForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6874ae14735176a56abaea45f91715cb.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
        RedirectController6874ae14735176a56abaea45f91715cbForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6874ae14735176a56abaea45f91715cb.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/notre-histoire'
 */
        RedirectController6874ae14735176a56abaea45f91715cbForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController6874ae14735176a56abaea45f91715cb.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController6874ae14735176a56abaea45f91715cb.form = RedirectController6874ae14735176a56abaea45f91715cbForm
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
const RedirectController0699a56c86a54ebd3e24090222dcf78c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController0699a56c86a54ebd3e24090222dcf78c.url(options),
    method: 'get',
})

RedirectController0699a56c86a54ebd3e24090222dcf78c.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/engagements',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
RedirectController0699a56c86a54ebd3e24090222dcf78c.url = (options?: RouteQueryOptions) => {
    return RedirectController0699a56c86a54ebd3e24090222dcf78c.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
RedirectController0699a56c86a54ebd3e24090222dcf78c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController0699a56c86a54ebd3e24090222dcf78c.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
RedirectController0699a56c86a54ebd3e24090222dcf78c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController0699a56c86a54ebd3e24090222dcf78c.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
RedirectController0699a56c86a54ebd3e24090222dcf78c.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController0699a56c86a54ebd3e24090222dcf78c.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
RedirectController0699a56c86a54ebd3e24090222dcf78c.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController0699a56c86a54ebd3e24090222dcf78c.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
RedirectController0699a56c86a54ebd3e24090222dcf78c.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController0699a56c86a54ebd3e24090222dcf78c.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
RedirectController0699a56c86a54ebd3e24090222dcf78c.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController0699a56c86a54ebd3e24090222dcf78c.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
RedirectController0699a56c86a54ebd3e24090222dcf78c.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController0699a56c86a54ebd3e24090222dcf78c.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
    const RedirectController0699a56c86a54ebd3e24090222dcf78cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController0699a56c86a54ebd3e24090222dcf78c.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
        RedirectController0699a56c86a54ebd3e24090222dcf78cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController0699a56c86a54ebd3e24090222dcf78c.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
        RedirectController0699a56c86a54ebd3e24090222dcf78cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController0699a56c86a54ebd3e24090222dcf78c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
        RedirectController0699a56c86a54ebd3e24090222dcf78cForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController0699a56c86a54ebd3e24090222dcf78c.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
        RedirectController0699a56c86a54ebd3e24090222dcf78cForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController0699a56c86a54ebd3e24090222dcf78c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
        RedirectController0699a56c86a54ebd3e24090222dcf78cForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController0699a56c86a54ebd3e24090222dcf78c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
        RedirectController0699a56c86a54ebd3e24090222dcf78cForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController0699a56c86a54ebd3e24090222dcf78c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/engagements'
 */
        RedirectController0699a56c86a54ebd3e24090222dcf78cForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController0699a56c86a54ebd3e24090222dcf78c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController0699a56c86a54ebd3e24090222dcf78c.form = RedirectController0699a56c86a54ebd3e24090222dcf78cForm
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
const RedirectController36402f3b102b68b92616e946647e00cf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController36402f3b102b68b92616e946647e00cf.url(options),
    method: 'get',
})

RedirectController36402f3b102b68b92616e946647e00cf.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/contact',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
RedirectController36402f3b102b68b92616e946647e00cf.url = (options?: RouteQueryOptions) => {
    return RedirectController36402f3b102b68b92616e946647e00cf.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
RedirectController36402f3b102b68b92616e946647e00cf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController36402f3b102b68b92616e946647e00cf.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
RedirectController36402f3b102b68b92616e946647e00cf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController36402f3b102b68b92616e946647e00cf.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
RedirectController36402f3b102b68b92616e946647e00cf.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController36402f3b102b68b92616e946647e00cf.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
RedirectController36402f3b102b68b92616e946647e00cf.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController36402f3b102b68b92616e946647e00cf.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
RedirectController36402f3b102b68b92616e946647e00cf.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController36402f3b102b68b92616e946647e00cf.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
RedirectController36402f3b102b68b92616e946647e00cf.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController36402f3b102b68b92616e946647e00cf.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
RedirectController36402f3b102b68b92616e946647e00cf.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController36402f3b102b68b92616e946647e00cf.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
    const RedirectController36402f3b102b68b92616e946647e00cfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController36402f3b102b68b92616e946647e00cf.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
        RedirectController36402f3b102b68b92616e946647e00cfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController36402f3b102b68b92616e946647e00cf.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
        RedirectController36402f3b102b68b92616e946647e00cfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController36402f3b102b68b92616e946647e00cf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
        RedirectController36402f3b102b68b92616e946647e00cfForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController36402f3b102b68b92616e946647e00cf.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
        RedirectController36402f3b102b68b92616e946647e00cfForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController36402f3b102b68b92616e946647e00cf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
        RedirectController36402f3b102b68b92616e946647e00cfForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController36402f3b102b68b92616e946647e00cf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
        RedirectController36402f3b102b68b92616e946647e00cfForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController36402f3b102b68b92616e946647e00cf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/contact'
 */
        RedirectController36402f3b102b68b92616e946647e00cfForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController36402f3b102b68b92616e946647e00cf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController36402f3b102b68b92616e946647e00cf.form = RedirectController36402f3b102b68b92616e946647e00cfForm
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
const RedirectController42a740574ecbfbac32f8cc353fc32db9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})

RedirectController42a740574ecbfbac32f8cc353fc32db9.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
RedirectController42a740574ecbfbac32f8cc353fc32db9.url = (options?: RouteQueryOptions) => {
    return RedirectController42a740574ecbfbac32f8cc353fc32db9.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
RedirectController42a740574ecbfbac32f8cc353fc32db9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
RedirectController42a740574ecbfbac32f8cc353fc32db9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
RedirectController42a740574ecbfbac32f8cc353fc32db9.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
RedirectController42a740574ecbfbac32f8cc353fc32db9.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
RedirectController42a740574ecbfbac32f8cc353fc32db9.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
RedirectController42a740574ecbfbac32f8cc353fc32db9.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
RedirectController42a740574ecbfbac32f8cc353fc32db9.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
    const RedirectController42a740574ecbfbac32f8cc353fc32db9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
        RedirectController42a740574ecbfbac32f8cc353fc32db9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
        RedirectController42a740574ecbfbac32f8cc353fc32db9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
        RedirectController42a740574ecbfbac32f8cc353fc32db9Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
        RedirectController42a740574ecbfbac32f8cc353fc32db9Form.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
        RedirectController42a740574ecbfbac32f8cc353fc32db9Form.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
        RedirectController42a740574ecbfbac32f8cc353fc32db9Form.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/dashboard'
 */
        RedirectController42a740574ecbfbac32f8cc353fc32db9Form.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController42a740574ecbfbac32f8cc353fc32db9.form = RedirectController42a740574ecbfbac32f8cc353fc32db9Form
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
const RedirectController4b87d2df7e3aa853f6720faea796e36c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'get',
})

RedirectController4b87d2df7e3aa853f6720faea796e36c.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/settings',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.url = (options?: RouteQueryOptions) => {
    return RedirectController4b87d2df7e3aa853f6720faea796e36c.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
    const RedirectController4b87d2df7e3aa853f6720faea796e36cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController4b87d2df7e3aa853f6720faea796e36c.form = RedirectController4b87d2df7e3aa853f6720faea796e36cForm

const RedirectController = {
    '/catalogue/{origin}': RedirectControllerc167f352a9a6b4645941500dc0ed12ed,
    '/about': RedirectController535fd093ca1d5254af5dc12ac208e8d5,
    '/engagement': RedirectController68c08bfac23f697f957867ffa87cd5ac,
    '/notre-histoire': RedirectController6874ae14735176a56abaea45f91715cb,
    '/engagements': RedirectController0699a56c86a54ebd3e24090222dcf78c,
    '/contact': RedirectController36402f3b102b68b92616e946647e00cf,
    '/dashboard': RedirectController42a740574ecbfbac32f8cc353fc32db9,
    '/settings': RedirectController4b87d2df7e3aa853f6720faea796e36c,
}

export default RedirectController