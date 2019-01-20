import { EffectFactory, httpListener } from '@marblejs/core'
import { bodyParser$ } from '@marblejs/middleware-body'
import { api$ } from './api'
import { Server } from './connection/server'
import { cors$ } from './middlewares/cors'
import { logger$ } from './middlewares/logger'
import { rootEffect$ } from './root.effect'

const root$ = EffectFactory.matchPath('/:dir*')
	.matchType('GET')
	.use(rootEffect$)

const middlewares = [cors$, logger$, bodyParser$]

const effects = [api$, root$]

export const app = httpListener({ middlewares, effects })

const bootstrap = async () => {
	//await Database.connect();
	await Server.create(app)
}

bootstrap()
