import { Atom } from '@grammarly/focal'
import { defer, of } from 'rxjs'
import { catchError, filter, map, mergeMap, takeUntil, tap } from 'rxjs/operators'
import { API } from '../../server/src/api/typesAPI'
import { actionsApp } from './actions'
import { retryStrategy } from './supply/utils'
import { IApp, IProfile } from './typesApp'

export const appState$ = Atom.create<{
	profiles: {
		loaded: IProfile[]
		loading: { [steamID: string]: true | undefined }
	}
	apps: { [appID: string]: IApp }
}>({
	profiles: {
		loaded: [],
		loading: {},
	},
	apps: {},
})

export const apps$ = appState$.lens('apps')
export const profiles$ = appState$.lens('profiles')
export const profilesLoaded$ = profiles$.lens('loaded')
export const profilesLoading$ = profiles$.lens('loading')

actionsApp.addProfile.$.pipe(
	tap((steamID) => {
		profilesLoading$.modify((loading) => ({ ...loading, [steamID]: true }))
	}),
	mergeMap((steamID) =>
		defer(() =>
			fetch(`/api/v1/profile/${steamID}`)
				.then((res) => res.json())
				.then<API.IProfileEffect | null>((res) => (res.error ? null : res))
		).pipe(
			takeUntil(actionsApp.removeProfile.$.pipe(filter((sid) => sid === steamID))),
			retryStrategy(),
			catchError(() => of(null)),
			map((response) => ({ response, steamID }))
		)
	)
).subscribe(({ response, steamID }) => {
	if (response) {
		appState$.modify(({ profiles, apps }) => {
			const nextApps = { ...apps }
			const nextLoaded = [...profiles.loaded]
			const nextLoading = { ...profiles.loading }
			const { profile, library } = response
			const newProfile: IProfile = { ...profile, own: {}, appsCount: 0, appsHidden: true }

			if (library) {
				newProfile.appsCount = library.count
				newProfile.appsHidden = false
				const own = newProfile.own
				library.apps.forEach(({ id, name, cover, flags, playtime }) => {
					own[id] = { playtime }
					if (!nextApps[id]) {
						nextApps[id] = {
							id,
							name,
							cover: `http://media.steampowered.com/steamcommunity/public/images/apps/${id}/${cover}.jpg`,
							flags,
						}
					}
				})
			}

			// Can't use steamID here coz server may convert it
			const profileID = profile.id
			const index = nextLoaded.findIndex(({ id }) => id === profileID)
			if (index > -1) {
				nextLoaded[index] = newProfile
			} else {
				nextLoaded.push(newProfile)
			}

			delete nextLoading[steamID]
			return { profiles: { loaded: nextLoaded, loading: nextLoading }, apps: nextApps }
		})
	} else {
		profilesLoading$.modify((loading) => {
			const nextLoading = { ...loading }
			delete nextLoading[steamID]
			return nextLoading
		})
	}
})

actionsApp.removeProfile.$.subscribe((steamID) => {
	profiles$.modify((profiles) => {
		const nextLoaded = [...profiles.loaded]
		const nextLoading = { ...profiles.loading }
		const index = nextLoaded.findIndex(({ id }) => id === steamID)
		if (index > -1) {
			nextLoaded.splice(index, 1)
		}
		delete nextLoading[steamID]
		return { loaded: nextLoaded, loading: nextLoading }
	})
})

if (process.env.NODE_ENV !== 'production') {
	const LS_APPS = '__APPS!_'
	const LS_PROFILES = '__PROF!_'

	const LSApps = localStorage.getItem(LS_APPS)
	const ParsedApps = LSApps && JSON.parse(LSApps)

	const LSLoaded = localStorage.getItem(LS_PROFILES)
	const ParsedLoaded = LSLoaded && JSON.parse(LSLoaded)

	if (ParsedApps || ParsedLoaded) {
		appState$.modify((state) => ({
			...state,
			apps: ParsedApps ? ParsedApps : state.apps,
			profiles: ParsedLoaded ? { ...state.profiles, loaded: ParsedLoaded } : state.profiles,
		}))
	}

	apps$.subscribe((state) => {
		localStorage.setItem(LS_APPS, JSON.stringify(state))
	})
	profilesLoaded$.subscribe((state) => {
		localStorage.setItem(LS_PROFILES, JSON.stringify(state))
	})
}
