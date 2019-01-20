import React from 'react'
import { style } from 'typestyle'

export const Info = ({ count }: { count: number }) => (
	<div className={$info}>
		<div className={$ico}>
			<svg role="img" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
				<title>How to use</title>
				<path d="m27.3 30v2.9q0 0.5-0.4 1t-1 0.4h-11.5q-0.6 0-1-0.4t-0.4-1v-2.9q0-0.6 0.4-1t1-0.4h1.5v-8.6h-1.5q-0.6 0-1-0.4t-0.4-1v-2.9q0-0.6 0.4-1t1-0.4h8.6q0.6 0 1 0.4t0.4 1v12.9h1.5q0.5 0 1 0.4t0.4 1z m-2.9-25.7v4.3q0 0.6-0.4 1t-1 0.4h-5.7q-0.6 0-1-0.4t-0.4-1v-4.3q0-0.6 0.4-1t1-0.4h5.7q0.6 0 1 0.4t0.4 1z" />
			</svg>
		</div>
		<div className={$text}>
			{`${count === 0 ? 'Add some' : 'Bring one more'}`} Steam profile with{' '}
			<b>public game library</b> to&nbsp;get a list of suggestions for what to&nbsp;play
			together!
		</div>
	</div>
)

const $info = style({
	display: 'flex',
})

const $ico = style({
	flexShrink: 0,
	color: '#72bd60',
	$nest: {
		'& svg': {
			width: '6em',
			height: '6em',
			marginLeft: '-1.5em',
		},
	},
})

const $text = style({
	fontSize: '1.6em',
	maxWidth: '20em',
	lineHeight: '1.5',
	color: '#5f7b58',
})
