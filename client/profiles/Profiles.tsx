import React from 'react'
import { style } from 'typestyle'
import { profilesLoaded$, profilesLoading$ } from '../@app/state'
import { gridSpaced } from '../@app/theme'
import { defaultProfile } from '../@app/typesApp'
import { bind$ } from '../@components/MapElement'
import { ReactiveList } from '../@components/ReactiveList'
import { LoadedCard, LoadingCard } from './Cards'
import { loadingNewProfiles$ } from './stateProfile'

export const Profiles = () => {
	return (
		<div className={$container}>
			<ReactiveList items={profilesLoaded$} defaultItem={defaultProfile}>
				{(profile$, i) =>
					bind$(
						profile$,
						(profile) =>
							bind$(profilesLoading$.view(profile.id), (isLoading) =>
								isLoading ? (
									<LoadingCard steamID={profile.name} />
								) : (
									<LoadedCard profile={profile} />
								)
							),
						'old' + i
					)
				}
			</ReactiveList>
			<ReactiveList items={loadingNewProfiles$} defaultItem={''}>
				{(steamID$, i) =>
					bind$(steamID$, (steamID) => <LoadingCard steamID={steamID} />, 'new' + i)
				}
			</ReactiveList>
		</div>
	)
}

const $container = style(gridSpaced(1), {
	flexShrink: 0,
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',
})
