import { ca, ga, generalActionsLog$ } from './supply/action-helpers'

if (process.env.NODE_ENV !== 'production') {
	generalActionsLog$.subscribe(({ key, namespace, payload }) => {
		// tslint:disable:no-console
		console.group('🔷', key, '🔹', namespace)
		console.log(payload)
		console.groupEnd()
	})
}

export const actionsApp = ga('app', {
	addProfile: ca<string>(),
	removeProfile: ca<string>(),
})

export const actionsInput = ga('input', {
	send: ca(),
	blur: ca(),
})
