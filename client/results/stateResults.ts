import { Atom } from '@grammarly/focal'
import { apps$, profilesLoaded$ } from '../@app/state'
import { IProfile } from '../@app/typesApp'
import { IAugmentedApp } from './typesResults'

export const results$ = Atom.combine(profilesLoaded$, apps$, (profiles, apps) => {
	const augmentedApps: { [appID: string]: IAugmentedApp } = {}
	const fullOverlap: number[] = []
	const partOverlap: number[] = []

	const publicProfiles = profiles.filter(({ appsHidden }) => !appsHidden)

	Object.values(apps).forEach((data) => {
		const appID = data.id
		const owners: IProfile[] = []
		const buyers: IProfile[] = []

		let totalPlaytime = 0
		let isFullOverlap = true

		publicProfiles.forEach((profile) => {
			const owned = profile.own[appID]
			if (owned !== undefined) {
				owners.push(profile)
				totalPlaytime += owned.playtime
			} else {
				buyers.push(profile)
				isFullOverlap = false
			}
		})
		;(isFullOverlap ? fullOverlap : partOverlap).push(appID)

		augmentedApps[appID] = {
			data,
			extra: {
				totalPlaytime,
				owners,
				buyers,
			},
		}
	})

	fullOverlap.sort(
		(a, b) => augmentedApps[a].extra.totalPlaytime - augmentedApps[b].extra.totalPlaytime
	)
	partOverlap.sort(
		(a, b) => augmentedApps[b].extra.totalPlaytime - augmentedApps[a].extra.totalPlaytime
	)

	return {
		publicProfilesCount: publicProfiles.length,
		augmentedApps,
		fullOverlap,
		partOverlap,
	}
})
