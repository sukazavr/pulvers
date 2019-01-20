import React from 'react'
import { style } from 'typestyle'
import { bind$ } from '../@components/MapElement'
import { AppCard } from './Cards'
import { Info } from './Info'
import { results$ } from './stateResults'

export const Results = () => {
	return bind$(results$, ({ publicProfilesCount, fullOverlap, partOverlap, augmentedApps }) => {
		if (publicProfilesCount > 1) {
			return (
				<>
					<div className={$section}>
						{fullOverlap.length === 0 && (
							<div className={$weird}>
								<p>You guys are really weird!</p>
								<p>Yours game libraries are absolutely different.</p>
							</div>
						)}
						{fullOverlap.length !== 0 && (
							<>
								<h2>Hooray! Each team mate has these games:</h2>
								<div className={$container}>
									{fullOverlap.map((appID) => (
										<AppCard key={appID} app={augmentedApps[appID]} />
									))}
								</div>
							</>
						)}
					</div>
					<div className={$section}>
						{fullOverlap.length === 0 && <h2>But we get to suggest you something:</h2>}
						{fullOverlap.length !== 0 && (
							<h2>Also there is a way to come up with something:</h2>
						)}
						<div className={$container}>
							{partOverlap.map((appID) => (
								<AppCard key={appID} app={augmentedApps[appID]} full />
							))}
						</div>
					</div>
				</>
			)
		} else {
			return <Info count={publicProfilesCount} />
		}
	})
}

const $section = style({
	$nest: {
		'& h2': {
			paddingBottom: '0.4em',
			marginBottom: '0.6em',
			borderBottom: '0.1em solid #ffd7be',
			borderRadius: '0.4em',
			fontSize: '2em',
			color: '#965555',
		},
	},
})

const $weird = style({
	fontSize: '1.6em',
	color: 'rebeccapurple',
	lineHeight: 1.4,
	$nest: {
		'& p + p': {
			marginTop: '0.6em',
		},
	},
})

const $container = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(10em, 1fr))',
	gridGap: '1em 1em',
})
