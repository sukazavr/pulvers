import React from 'react'
import { style } from 'typestyle'
import { Input } from '../input/Input'
import { Profiles } from '../profiles/Profiles'
import { Results } from '../results/Results'
import { verticallySpaced } from './theme'

export const App = () => {
	return (
		<div className={$container}>
			<Input />
			<Profiles />
			<Results />
		</div>
	)
}

const $container = style(verticallySpaced(4), {
	flexGrow: 1,
	display: 'flex',
	flexDirection: 'column',
	padding: '2em',
	overflowY: 'auto',
})
