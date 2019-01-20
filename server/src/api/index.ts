import { combineRoutes, EffectFactory } from '@marblejs/core'
import { preflightEffect$ } from './effects/preflight'
import { notFoundEffect$ } from './effects/not-found'
import { profileEffect$ } from './effects/profile'

const profile$ = EffectFactory.matchPath('/profile/:steamID')
	.matchType('GET')
	.use(profileEffect$)

const preflight$ = EffectFactory.matchPath('*')
	.matchType('OPTIONS')
	.use(preflightEffect$)

const notFound$ = EffectFactory.matchPath('*')
	.matchType('*')
	.use(notFoundEffect$)

export const api$ = combineRoutes('/api/v1', [profile$, preflight$, notFound$])
