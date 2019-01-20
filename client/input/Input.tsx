import { bind, F } from '@grammarly/focal'
import React from 'react'
import { classes, style } from 'typestyle'
import { actionsInput } from '../@app/actions'
import { $tappable, redColor } from '../@app/theme'
import { error$, value$ } from './stateInput'

export const Input = () => {
	return (
		<div>
			<div className={$container}>
				<F.input
					className={$input}
					{...bind({ value: value$ })}
					onBlur={actionsInput.blur}
					onKeyDown={onEnterPress}
					placeholder="Steam ID/Name/URL"
				/>
				<button className={$button} onClick={actionsInput.send}>
					Add Profile
				</button>
			</div>
			<F.div className={$error}>{error$}</F.div>
		</div>
	)
}

const $container = style({
	flexShrink: 0,
	display: 'flex',
})

const $input = style({
	background: '#fff',
	border: '1px solid #558447',
	boxShadow: '#d2e6ce 0 0.2em 0em 0px inset',
	fontSize: '1.2em',
	padding: '1em',
	resize: 'none',
	width: '100%',
	maxWidth: '46em',
})

const $button = classes(
	$tappable,
	style({
		background: '#acff98',
		border: '.2em solid #558447',
		borderLeftWidth: '0',
		borderRightWidth: '1px',
		borderTopWidth: '1px',
		fontSize: '1.4em',
		padding: '0.2em 1.2em',
		whiteSpace: 'nowrap',
	})
)

const $error = style({ color: redColor, fontSize: '1.4em', marginTop: '0.8em' })

const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
	if (e.keyCode === 13 && e.shiftKey === false) {
		e.preventDefault()
		actionsInput.send()
	}
}
