import { Atom } from '@grammarly/focal'
import { merge } from 'rxjs'
import { debounceTime, sample, skip, withLatestFrom } from 'rxjs/operators'
import { actionsInput, actionsApp } from '../@app/actions'
import { getSteamID } from './steam-id-utils'

export const value$ = Atom.create('')

export const steamID$ = value$.map(getSteamID)

export const error$ = merge(
	value$.map(() => ''),
	steamID$
		.pipe(
			sample(
				merge(
					actionsInput.blur.$,
					actionsInput.send.$,
					value$.pipe(
						skip(1),
						debounceTime(2000)
					)
				)
			),
			withLatestFrom(value$)
		)
		.map(([steamID, input]) => (input && steamID === null ? ERROR : ''))
)

const ERROR = "Can't recognize Steam ID or Name or Profile URL"

actionsInput.send.$.pipe(withLatestFrom(steamID$)).subscribe(([, steamID]) => {
	if (steamID) {
		value$.set('')
		actionsApp.addProfile(steamID)
	}
})
