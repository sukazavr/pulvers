import { profiles$ } from '../@app/state'

export const loadingNewProfiles$ = profiles$.view(({ loaded, loading }) => {
	const index = loaded.reduce<{ [steamID: string]: true }>((acc, profile) => {
		acc[profile.id] = true
		return acc
	}, {})
	return Object.keys(loading).filter((id) => !index[id])
})
